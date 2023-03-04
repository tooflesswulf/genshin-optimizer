// import { ArtifactSlotKey, allArtifactSlotKeys } from "@genshin-optimizer/consts"
// import { Count, CountResult, Done, Finalize, FinalizeResult, Interim, OptProblemInput, Threshold } from ".."
// import { OptNode, optimize } from "../../Formula/optimization"
// import { pruneAll, pruneExclusion } from "../common"
// import { WorkerCoordinator } from "../coordinator"
// import { ArtSetExclusionFull, ArtifactsBySlotVec, statsUpperLowerVec, toArtifactsBySlotVec } from "./commonVec"
// import { LinearForm } from "./linear"
// import { elimLinDepStats, thresholdExclusions, thresholdToConstBranchForm } from "./preprocessing"
// import { objectKeyMap, objectKeyValueMap } from "../../Util/Util"
// import { ExpandedPolynomial, expandPoly } from "./polynomial"

// export class BNBVecSolver extends WorkerCoordinator<BNBCommand, BNBResult> {
//   private status: Record<'tested' | 'failed' | 'skipped' | 'total', number>
//   private topN: number
//   private buildValues: { w: Worker, val: number }[]
//   private finalizedResults: FinalizeResult[] = []
//   private initialProblem: BNBSubproblemNoCache

//   constructor(problem: OptProblemInput, status: BNBVecSolver['status'], numWorker: number) {
//     const workers = Array(numWorker).fill(NaN).map(_ => new Worker(new URL('./BackgroundWorker.ts', import.meta.url)))
//     super(workers, ['enumerate', 'split', 'count'], (r, w) => {
//       switch (r.resultType) {
//         case 'interim': this.interim(r, w); break
//         case 'finalize': this.finalizedResults.push(r); break
//         case 'count': this.status.total = r.count; break
//       }
//     })

//     const { topN } = problem
//     this.status = status
//     this.topN = topN
//     this.buildValues = Array(topN).fill({ w: undefined as any, val: -Infinity })

//     const { setupCommand, initialProblem } = this.preprocess(problem)
//     this.initialProblem = initialProblem
//     console.log(setupCommand)
//     console.log(this.initialProblem)
//     throw Error('Die')
//   }

//   async solve() {
//     throw Error('die')
//     return this.finalizedResults
//   }

//   preprocess({ plotBase, optimizationTarget, arts, topN, exclusion, constraints }: OptProblemInput): { setupCommand: SetupBNB, initialProblem: BNBSubproblemNoCache } {
//     constraints = constraints.filter(x => x.min > -Infinity)

//     let nodes = [...constraints.map(x => x.value), optimizationTarget]
//     const minimums = [...constraints.map(x => x.min), -Infinity]
//     if (plotBase) {
//       nodes.push(plotBase)
//       minimums.push(-Infinity)
//     }

//     nodes = pruneExclusion(nodes, exclusion);
//     ({ nodes, arts } = pruneAll(nodes, minimums, arts, topN, exclusion,
//       { reaffine: true, pruneArtRange: true, pruneNodeRange: true, pruneOrder: true }))
//     nodes = optimize(nodes, {}, _ => false)

//     nodes = thresholdExclusions(nodes, exclusion)
//     nodes = thresholdToConstBranchForm(nodes);
//     ({ nodes, arts } = elimLinDepStats(arts, nodes))
//     nodes = optimize(nodes, {}, _ => false)

//     if (plotBase) plotBase = nodes.pop()
//     optimizationTarget = nodes.pop()!
//     constraints = nodes.map((value, i) => ({ value, min: minimums[i] }))
//     const optTargetEP = expandPoly(optimizationTarget)
//     const constraintsEP = constraints.map(({ value, min }) => ({ value: expandPoly(value), min }))

//     const exclusionFull = objectKeyValueMap(Object.entries(exclusion), ([setKey, v]) => {
//       if (setKey === 'rainbow') return ['uniqueKey', v.map(v => v + 1)]
//       return [setKey, v.flatMap(v => (v === 2) ? [2, 3] : [4, 5])]
//     })

//     const artsVec = toArtifactsBySlotVec(arts)

//     const filter = objectKeyMap(allArtifactSlotKeys, slotKey => { return arts.values[slotKey].map((v, i) => i) })
//     const { lower, upper } = statsUpperLowerVec(artsVec)

//     const f = [...constraintsEP.map(({ value }) => value), optTargetEP]
//     const lin = f.map(fi => toLinearUpperBound(fi, statsMin, statsMax))
//     const initialFilter: BNBRequestFilter = {
//       filter, lower, upper,
//       maxw: minMaxEst.map(({ maxw }) => maxw),
//       minw: minMaxEst.map(({ minw }) => minw),
//     }

//     return {
//       setupCommand: {
//         command: 'setup',
//         arts: artsVec,
//       },
//       initialProblem: {
//         cache: false,
//         optTarget: optTargetEP,
//         constraints: constraintsEP, artSetExclusion: exclusionFull,
//         unionFilters: [initialFilter], depth: 0
//       }
//     }
//   }

//   /** Returns a new `threshold` if altered */
//   private interim(r: Interim, worker: Worker) {
//     this.status.tested += r.tested
//     this.status.failed += r.failed
//     this.status.skipped += r.skipped

//     if (r.buildValues) {
//       const { topN } = this, oldThreshold = this.buildValues[topN - 1].val ?? -Infinity

//       this.buildValues.filter(({ w }) => w !== worker)
//       this.buildValues.push(...r.buildValues.map(val => ({ w: worker!, val })))
//       this.buildValues.sort((a, b) => b.val - a.val).splice(topN)

//       const threshold = this.buildValues[topN - 1].val ?? -Infinity
//       if (oldThreshold !== threshold)
//         this.broadcast({ command: 'threshold', threshold })
//     }
//   }
// }

// export type BNBRequestFilter = {
//   filter: StrictDict<ArtifactSlotKey, number[]>
//   lower: number[], upper: number[]
//   minw: number[], maxw: number[]
// }

// type BNBSubproblemBase = {
//   optTarget: ExpandedPolynomial
//   constraints: { value: ExpandedPolynomial, min: number }[]
//   artSetExclusion: ArtSetExclusionFull

//   unionFilters: BNBRequestFilter[]
//   depth: number
// }
// export type BNBSubproblemNoCache = {
//   cache: false
// } & BNBSubproblemBase
// export type BNBSubproblemWithCache = {
//   cache: true
//   lin: LinearForm[]
// } & BNBSubproblemBase
// export type BNBSubproblem = BNBSubproblemNoCache | BNBSubproblemWithCache

// export type BNBCommand = SetupBNB | SplitBNB | Enumerate | Threshold | Finalize | Count
// export type BNBResult = SplitBNBResult | Interim | CountResult | FinalizeResult | Done

// export interface SetupBNB {
//   command: 'setup'
//   arts: ArtifactsBySlotVec
// }
// export interface SplitBNB {
//   command: 'split'
//   threshold: number
//   minCount: number
//   maxIter: number
//   subproblem?: BNBSubproblem
// }
// export interface Enumerate {
//   command: 'enumerate'
//   threshold: number
//   subproblem: BNBSubproblem
// }

// export interface SplitBNBResult {
//   resultType: 'split'
//   ready: boolean
//   subproblems: BNBSubproblem[]
// }
