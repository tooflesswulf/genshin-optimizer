import { RequestFilter, artSetPerm, countBuilds, filterArts, filterFeasiblePerm } from "../common"
import { assertUnreachable } from "../../Util/Util"
import { WorkerCommand, WorkerResult } from "./GOSolver"
import { DefaultSplitWorker } from "./DefaultSplitWorker"
import { ComputeWorker } from "./ComputeWorker"
import { BNBSplitWorker } from "./BNBSplitWorker"

let id: number, splitter: SplitWorker, computeWorker: ComputeWorker

onmessage = ({ data }: { data: WorkerCommand }) => {
  const { command } = data;
  let result: WorkerResult;
  switch (command) {
    case "setup": {
      id = data.id;
      const splitID = `split${id}`, computeID = `compute${id}`;
      try {
        splitter = new BNBSplitWorker(data, interim => postMessage({ id, source: splitID, ...interim }))
      } catch {
        splitter = new DefaultSplitWorker(data, (interim) => postMessage({ id, source: splitID, ...interim }))
      }
      computeWorker = new ComputeWorker(data, (interim) => postMessage({ id, source: computeID, ...interim }))
      result = { command: "iterate", id };
      break;
    }
    case "split": {
      if (data.filter) splitter.addFilter(data.filter)
      const filter = splitter.split(data.threshold, data.minCount)
      result = { command: "split", filter, id }
      break
    }
    case "iterate": {
      const { threshold, filter } = data
      computeWorker.compute(threshold, filter)
      result = { command: "iterate", id }
      break
    }
    case "finalize": {
      computeWorker.refresh(true)
      const { builds, plotData } = computeWorker
      result = { command: "finalize", builds, plotData }
      break
    }
    case "count": {
      const { exclusion } = data, arts = computeWorker.arts
      const setPerm = filterFeasiblePerm(artSetPerm(exclusion, [...new Set(Object.values(arts.values).flatMap((x) => x.map((x) => x.set!))),]), arts)
      const counts = data.arts.map((_) => 0)
      for (const perm of setPerm)
        data.arts.forEach((arts, i) => (counts[i] += countBuilds(filterArts(arts, perm))))
      result = { command: "count", counts }
      break
    }
    default:
      assertUnreachable(command)
  }
  postMessage({ ...result });
}

export interface SplitWorker {
  addFilter(filter: RequestFilter): void
  split(newThreshold: number, minCount: number): RequestFilter | undefined
}
