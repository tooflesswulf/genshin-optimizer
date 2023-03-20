import { allArtifactSlotKeys } from "@genshin-optimizer/consts"
import type { Done, Finalize, FinalizeResult, Interim, OptProblemInput, Threshold } from ".."
import type { OptNode} from "../../Formula/optimization";
import { optimize } from "../../Formula/optimization"
import type { ArtifactsBySlot} from "../utils/common";
import { pruneAll, pruneExclusion } from "../utils/common"
import { WorkerCoordinator } from "../coordinator"
import type { ArtSetExclusionFull, ArtifactsBySlotVec} from "../utils/commonVec";
import { applyLinAppx, statsUpperLowerVec, toArtifactsBySlotVec } from "../utils/commonVec"
import { elimLinDepStats, thresholdExclusions, thresholdToConstBranchForm } from "../utils/preprocessing"
import { objectKeyMap, objectKeyValueMap, range } from "../../Util/Util"
import { expandFormulas } from "../utils/expandFormula"
import { linearUBExpandedVec } from "../utils/linearUB"
import type { BNBRequestFilter, BNBSubproblem } from "./bnbSubproblem"

export class BNBVecSolver extends WorkerCoordinator<BNBCommand, BNBResult> {
  private status: Record<'tested' | 'failed' | 'skipped' | 'total', number>
  private topN: number
  private buildValues: { w: Worker, val: number }[]
  private finalizedResults: FinalizeResult[] = []
  private initialProblem: BNBSubproblem

  constructor(problem: OptProblemInput, status: BNBVecSolver['status'], numWorker: number) {
    const workers = Array(numWorker).fill(NaN).map(_ => new Worker(new URL('./BNBVecBackgroundWorker.ts', import.meta.url)))
    super(workers, ['enumerate', 'split'], (r, w) => {
      switch (r.resultType) {
        case 'interim': this.interim(r, w); break
        case 'finalize': this.finalizedResults.push(r); break
        case 'checkin': {
          if (this.commands.every(fifo => fifo.length === 0))
            w.postMessage({ command: 'share', splitsToAdd: numWorker })

          const i = this.prio.get('enumerate')!
          const numToPop = Math.ceil(this.commands[i].length / numWorker)
          const toPostArr = range(1, numToPop).map(_ => this.commands[i].pop()! as EnumerateBNB)
          toPostArr.forEach(toPost => {
            toPost.interrupt = true
            w.postMessage(toPost)
          })
          w.postMessage({ command: 'resume' }); break
        }
      }
    })

    const { topN } = problem
    this.status = status
    this.topN = topN
    this.buildValues = Array(topN).fill({ w: undefined as unknown, val: -Infinity })

    const { setupCommand, initialProblem } = this.preprocess(problem)
    this.initialProblem = initialProblem
    this.status.total = Object.values(initialProblem.unionFilter[0]?.filter).reduce((tot, slotArts) => tot * slotArts.length, 1)
    this.notifiedBroadcast(setupCommand)
  }

  async solve() {
    this.finalizedResults = []
    await this.execute([{ command: 'split', maxIterateSize: 40_000, subproblem: this.initialProblem }])
    this.notifiedBroadcast({ command: 'finalize' })
    await this.execute([])
    return this.finalizedResults
  }

  preprocess({ plotBase, optimizationTarget, arts, topN, exclusion, constraints }: OptProblemInput): { setupCommand: SetupBNB, initialProblem: BNBSubproblem } {
    constraints = constraints.filter(x => x.min > -Infinity)

    let nodes = [...constraints.map(x => x.value), optimizationTarget]
    const minimums = [...constraints.map(x => x.min), -Infinity]
    if (plotBase) {
      nodes.push(plotBase)
      minimums.push(-Infinity)
    }

    nodes = pruneExclusion(nodes, exclusion);
    ({ nodes, arts } = pruneAll(nodes, minimums, arts, topN, exclusion,
      { reaffine: true, pruneArtRange: true, pruneNodeRange: true, pruneOrder: true }))
    nodes = optimize(nodes, {}, _ => false)

    nodes = thresholdExclusions(nodes, exclusion)
    nodes = thresholdToConstBranchForm(nodes);
    ({ nodes, arts } = elimLinDepStats(arts, nodes))
    nodes = optimize(nodes, {}, _ => false)

    const formulas = expandFormulas(nodes)
    const targetIxs = [minimums.length - 1]
    if (plotBase) targetIxs.unshift(minimums.length - 2)

    const exclusionFull = objectKeyValueMap(Object.entries(exclusion), ([setKey, v]) => {
      if (setKey === 'rainbow') return ['uniqueKey', v.map(v => v + 1)]
      return [setKey, v.flatMap(v => (v === 2) ? [2, 3] : [4, 5])]
    })

    const artsVec = toArtifactsBySlotVec(arts)
    const approximations = linearUBExpandedVec(formulas, artsVec)
    applyLinAppx(artsVec, approximations)

    const filter = objectKeyMap(allArtifactSlotKeys, slotKey => { return arts.values[slotKey].map((v, i) => i) })
    const initialFilter: BNBRequestFilter = { filter, ...statsUpperLowerVec(artsVec) }

    return {
      setupCommand: {
        command: 'setup',
        arts, artsVec,
        targetIxs, topN,
        nodes, minimums,
        artSetExclusion: exclusionFull,
      },
      initialProblem: {
        cache: true, depth: 0,
        lin: approximations, targetIxs,
        formulas, unionFilter: [initialFilter],
        minimums, exclusion: exclusionFull
      }
    }
  }

  /** Returns a new `threshold` if altered */
  private interim(r: Interim, worker: Worker) {
    this.status.tested += r.tested
    this.status.failed += r.failed
    this.status.skipped += r.skipped

    if (r.buildValues) {
      const { topN } = this, oldThreshold = this.buildValues[topN - 1].val ?? -Infinity

      // this.buildValues.filter(({ w }) => w !== worker)
      this.buildValues.push(...r.buildValues.map(val => ({ w: worker, val })))
      this.buildValues.sort((a, b) => b.val - a.val).splice(topN)

      const threshold = this.buildValues[topN - 1].val ?? -Infinity
      if (oldThreshold !== threshold)
        this.broadcast({ command: 'threshold', threshold })
    }
  }
}

export type BNBCommand = SetupBNB | SplitBNB | EnumerateBNB | ShareBNB | Resume | Threshold | Finalize
export type BNBResult = CheckinResult | Interim | FinalizeResult | Done

export interface SetupBNB {
  command: 'setup'
  arts: ArtifactsBySlot
  artsVec: ArtifactsBySlotVec
  topN: number

  targetIxs: number[]  // formula(s) we are trying to maximize ([optTarget, plotTarget])
  nodes: OptNode[]
  minimums: number[]
  artSetExclusion: ArtSetExclusionFull
}
export interface SplitBNB {
  command: 'split'
  maxIterateSize: number
  subproblem: BNBSubproblem
}
export interface EnumerateBNB {
  command: 'enumerate'
  filters: BNBRequestFilter[]
  interrupt?: boolean  // Whether this needs to return 'done' or not
}

export interface ShareBNB {
  command: 'share'
  splitsToAdd: number
}
export interface Resume {
  command: 'resume'
}
export interface CheckinResult {
  resultType: 'checkin'
}

// export interface SplitBNBResult {
//   resultType: 'split'
//   ready: boolean
//   subproblems: BNBSubproblem[]
// }
