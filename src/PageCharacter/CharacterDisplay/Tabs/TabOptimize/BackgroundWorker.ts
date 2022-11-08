import { ArtSetExclusion } from '../../../../Database/DataManagers/BuildSettingData'
import { OptNode } from '../../../../Formula/optimization'
import { assertUnreachable } from '../../../../Util/Util'
import { ArtifactsBySlot, ArtifactsBySlotVec, artSetPerm, Build, countBuilds, filterArts, filterFeasiblePerm, PlotData, RequestFilter } from "./common"
import { ComputeWorker } from "./ComputeWorker"
import { DefaultSplitWorker } from "./DefaultSplitWorker"
import { SubProblem } from './subproblemUtil'

let id: number, splitWorker: DefaultSplitWorker, computeWorker: ComputeWorker

onmessage = ({ data }: { data: WorkerCommand }) => {
  const { command } = data
  let result: WorkerResult
  switch (command) {
    case "setup":
      id = data.id
      const splitID = `split${id}`, computeID = `compute${id}`
      splitWorker = new DefaultSplitWorker(data, interim => postMessage({ id, source: splitID, ...interim }))
      computeWorker = new ComputeWorker(data, interim => postMessage({ id, source: computeID, ...interim }))
      result = { command: "iterate" }
      break
    case "split":
      result = { command: "split", subproblems: splitWorker.split(data), ready: splitWorker.subproblems.length === 0 }
      break
    case "iterate":
      const { threshold, subproblem } = data
      computeWorker.computeU(threshold, subproblem)
      result = { command: "iterate" }
      break
    case "finalize":
      computeWorker.refresh(true)
      const { builds, plotData } = computeWorker
      result = { command: "finalize", builds, plotData }
      break
    case "count":
      {
        const { exclusion } = data, arts = computeWorker.arts
        const setPerm = filterFeasiblePerm(artSetPerm(exclusion, [...new Set(Object.values(arts.values).flatMap(x => x.map(x => x.set!)))]), arts)
        let counts = data.arts.map(_ => 0)
        for (const perm of setPerm)
          data.arts.forEach((arts, i) => counts[i] += countBuilds(filterArts(arts, perm)));
        result = { command: "count", counts }
        break
      }
    case "share":
      const oo = splitWorker.popOne()
      result = { command: 'share', subproblem: oo, sender: data.sender }
      break
    default: assertUnreachable(command)
  }
  postMessage({ id, ...result })
}

export interface SplitWorker {
  addFilter(filter: RequestFilter): void
  split(newThreshold: number, minCount: number): RequestFilter | undefined
}


export type WorkerCommand = Setup | Split | Iterate | Finalize | Share | Count
export type WorkerResult = SourcedInterimResult | SplitResult | IterateResult | FinalizeResult | ShareResult | CountResult

export interface Setup {
  command: "setup"

  id: number
  arts: ArtifactsBySlot
  artsVec: ArtifactsBySlotVec

  optimizationTarget: OptNode
  constraints: { node: OptNode, min: number }[]
  artSetExclusion: ArtSetExclusion
  plotBase: OptNode | undefined,
  maxBuilds: number
}
export interface Split {
  command: "split"
  threshold: number
  minCount: number
  maxIter: number

  subproblem?: SubProblem
}
export interface Iterate {
  command: "iterate"
  threshold: number

  subproblem: SubProblem
}
export interface Finalize {
  command: "finalize"
}
export interface Share {
  command: "share"
  sender: number
}
export interface Count {
  command: "count"
  arts: ArtifactsBySlot[]
  exclusion: ArtSetExclusion
}

export interface InterimResult {
  command: "interim"
  buildValues: number[] | undefined
  /** The number of builds since last report, including failed builds */
  tested: number
  /** The number of builds that does not meet the min-filter requirement since last report */
  failed: number
  skipped: number
}
export interface IterateResult {
  command: "iterate"
}
export interface SplitResult {
  command: "split"
  ready: boolean
  subproblems: SubProblem[]
}
export interface FinalizeResult {
  command: "finalize"
  builds: Build[]
  plotData?: PlotData
}
export interface ShareResult {
  command: "share"
  subproblem?: SubProblem
  sender: number
}
export interface CountResult {
  command: "count"
  counts: number[]
}
export interface InterimResult {
  command: "interim"
  buildValues: number[] | undefined
  /** The number of builds since last report, including failed builds */
  tested: number
  /** The number of builds that does not meet the min-filter requirement since last report */
  failed: number
  skipped: number
}
export interface SourcedInterimResult extends InterimResult {
  /** the source of the message, must be unique for each source of `buildValues` */
  source: string
}
