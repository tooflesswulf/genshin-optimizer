import { BNBVecEnumerateWorker } from "./BNBVecEnumerateWorker";
import { BNBCommand, BNBResult } from "./BNBVecSolver";
import { BNBVecSplitWorker } from "./BNBVecSplitWorker";

declare function postMessage(command: BNBCommand | BNBResult): void

let computeWorker: BNBVecEnumerateWorker, splitWorker: BNBVecSplitWorker

onmessage = async (e: MessageEvent<BNBCommand>) => {
  const { data } = e, { command } = data
  switch (command) {
    case 'setup':
      computeWorker = new BNBVecEnumerateWorker(data, x => postMessage(x))
      splitWorker = new BNBVecSplitWorker(data, x => postMessage(x))
      console.log('CONSTRUCT SPLITTER I GUESS?')
      postMessage({ resultType: 'done' })
      break
    case 'split':
      // postMessage({ command: 'enumerate', filters: data.subproblem.unionFilters })
      splitWorker.addSubproblem(data.subproblem)
      while (splitWorker.subproblems.length) {
        const subp = splitWorker.split(data.maxIterateSize)
        if (subp) postMessage({ command: 'enumerate', filters: subp.unionFilter })
        splitWorker.reportInterim()
        await Promise.resolve()  // in case a `threshold` is sent over
      }
      postMessage({ resultType: 'done' })
      break
    case 'threshold':
      computeWorker.setThreshold(data.threshold)
      splitWorker.setThreshold(data.threshold)
      break  // Must not send 'done'
    case "enumerate":
      computeWorker.enumerate(data.filters)
      postMessage({ resultType: 'done' })
      break
    case "finalize": {
      computeWorker.refresh(true)
      const { builds, plotData } = computeWorker
      postMessage({ resultType: 'finalize', builds, plotData })
      postMessage({ resultType: 'done' })
      break
    }
  }
}
