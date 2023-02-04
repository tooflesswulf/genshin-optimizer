import { artSetPerm, countBuilds, filterArts, filterFeasiblePerm } from "../common"
import { assertUnreachable } from "../../Util/Util"
import { WorkerCommand, WorkerResult } from "./EnumerationSolver"
import { ArtSetSplitter } from "./ArtSetSplitter"
import { Enumerator } from "./Enumerator"

let id: number, splitter: ArtSetSplitter, computeWorker: Enumerator

onmessage = ({ data }: { data: WorkerCommand }) => {
  const { command } = data
  let result: WorkerResult
  switch (command) {
    case "setup": {
      id = data.id
      const splitID = `split${id}`, computeID = `compute${id}`
      splitter = new ArtSetSplitter(data, interim => postMessage({ id, source: splitID, ...interim }))
      computeWorker = new Enumerator(data, interim => postMessage({ id, source: computeID, ...interim }))
      result = { command: "iterate" }
      break
    }
    case "split": {
      if (data.filter) splitter.addFilter(data.filter)
      const filter = splitter.split(data.minCount)
      result = { command: "split", filter }
      break
    }
    case "iterate": {
      const { threshold, filter } = data
      computeWorker.compute(threshold, filter)
      result = { command: "iterate" }
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
      const setPerm = filterFeasiblePerm(artSetPerm(exclusion, [...new Set(Object.values(arts.values).flatMap(x => x.map(x => x.set!)))]), arts)
      const counts = data.arts.map(_ => 0)
      for (const perm of setPerm)
        data.arts.forEach((arts, i) => counts[i] += countBuilds(filterArts(arts, perm)));
      result = { command: "count", counts }
      break
    }
    default: assertUnreachable(command)
  }
  postMessage({ id, ...result })
}
