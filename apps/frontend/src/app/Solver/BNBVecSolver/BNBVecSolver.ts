import { ArtifactSlotKey, allArtifactSlotKeys } from "@genshin-optimizer/consts"
import { Count, CountResult, Done, Finalize, FinalizeResult, Interim, OptProblemInput, Threshold } from ".."
import { OptNode, optimize } from "../../Formula/optimization"
import { ArtifactsBySlot, pruneAll, pruneExclusion } from "../utils/common"
import { WorkerCoordinator } from "../coordinator"
import { ArtSetExclusionFull, ArtifactsBySlotVec, applyLinAppx, statsUpperLowerVec, toArtifactsBySlotVec } from "../utils/commonVec"
import { elimLinDepStats, thresholdExclusions, thresholdToConstBranchForm } from "../utils/preprocessing"
import { objectKeyMap, objectKeyValueMap } from "../../Util/Util"
import { ExpandedFormulas, expandFormulas } from "../utils/expandFormula"
import { Linear, LinearVec, linearUBExpandedVec } from "../utils/linearUB"

export class BNBVecSolver extends WorkerCoordinator<BNBCommand, BNBResult> {
  private status: Record<'tested' | 'failed' | 'skipped' | 'total', number>
  private topN: number
  private buildValues: { w: Worker, val: number }[]
  private finalizedResults: FinalizeResult[] = []
  private initialProblem: BNBSubproblemNoCache

  constructor(problem: OptProblemInput, status: BNBVecSolver['status'], numWorker: number) {
    const workers = Array(numWorker).fill(NaN).map(_ => new Worker(new URL('./BNBVecBackgroundWorker.ts', import.meta.url)))
    super(workers, ['enumerate', 'split'], (r, w) => {
      switch (r.resultType) {
        case 'interim': this.interim(r, w); break
        case 'finalize': this.finalizedResults.push(r); break
      }
    })

    const { topN } = problem
    this.status = status
    this.topN = topN
    this.buildValues = Array(topN).fill({ w: undefined as any, val: -Infinity })

    const { setupCommand, initialProblem } = this.preprocess(problem)
    this.initialProblem = initialProblem
    this.status.total = Object.values(initialProblem.unionFilters[0]?.filter).reduce((tot, slotArts) => tot * slotArts.length, 1)
    this.notifiedBroadcast(setupCommand)
  }

  async solve() {
    await this.execute([{ command: 'split', threshold: -Infinity, subproblem: this.initialProblem }])
    this.notifiedBroadcast({ command: 'finalize' })
    console.log('done???')
    await this.execute([])
    return this.finalizedResults
  }

  preprocess({ plotBase, optimizationTarget, arts, topN, exclusion, constraints }: OptProblemInput): { setupCommand: SetupBNB, initialProblem: BNBSubproblemNoCache } {
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
        cache: false, depth: 0,
        formulas, unionFilters: [initialFilter],
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

      this.buildValues.filter(({ w }) => w !== worker)
      this.buildValues.push(...r.buildValues.map(val => ({ w: worker!, val })))
      this.buildValues.sort((a, b) => b.val - a.val).splice(topN)

      const threshold = this.buildValues[topN - 1].val ?? -Infinity
      if (oldThreshold !== threshold)
        this.broadcast({ command: 'threshold', threshold })
    }
  }
}

export type BNBRequestFilter = {
  filter: StrictDict<ArtifactSlotKey, number[]>
  lower: number[], upper: number[]
  minw: number[], maxw: number[]
}

type BNBSubproblemBase = {
  formulas: ExpandedFormulas
  unionFilters: BNBRequestFilter[]
  depth: number
}
export type BNBSubproblemNoCache = {
  cache: false
} & BNBSubproblemBase
export type BNBSubproblemWithCache = {
  cache: true
  lin: LinearVec[]
} & BNBSubproblemBase
export type BNBSubproblem = BNBSubproblemNoCache | BNBSubproblemWithCache

export type BNBCommand = SetupBNB | SplitBNB | EnumerateBNB | Threshold | Finalize
export type BNBResult = SplitBNBResult | Interim | FinalizeResult | Done

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
  threshold: number
  subproblem: BNBSubproblem
}
export interface EnumerateBNB {
  command: 'enumerate'
  threshold: number
  subproblem: BNBSubproblem
}

export interface SplitBNBResult {
  resultType: 'split'
  ready: boolean
  subproblems: BNBSubproblem[]
}
