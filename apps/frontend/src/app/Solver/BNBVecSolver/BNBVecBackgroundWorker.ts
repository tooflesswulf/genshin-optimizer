import { BNBVecEnumerateWorker } from "./BNBVecEnumerateWorker";
import { BNBCommand, BNBResult } from "./BNBVecSolver";
import { BNBVecSplitWorker } from "./BNBVecSplitWorker";

declare function postMessage(command: BNBCommand | BNBResult): void

let computeWorker: BNBVecEnumerateWorker, splitWorker: BNBVecSplitWorker
let maxIterateSize: number

onmessage = (e: MessageEvent<BNBCommand>) => {
  const { data } = e, { command } = data
  switch (command) {
    case 'setup':
      computeWorker = new BNBVecEnumerateWorker(data, x => postMessage(x))
      splitWorker = new BNBVecSplitWorker(data, x => postMessage(x))
      postMessage({ resultType: 'done' })
      break
    case 'share': {
      console.log('Requested to share (b4)', splitWorker.subproblems.length)
      const toShare = splitWorker.shareWork(data.splitsToAdd)
      console.log('Requested to share work. Worker has N:', splitWorker.subproblems.length, { toShare })
      toShare.forEach(subproblem => {
        postMessage({ command: 'split', maxIterateSize, subproblem })
      })
      break
    }
    case 'split':
      splitWorker.addSubproblem(data.subproblem)
      maxIterateSize = data.maxIterateSize
    // eslint-disable-next-line no-fallthrough
    case 'resume': {
      let i = 0
      for (const subproblem of splitWorker.split(maxIterateSize)) {
        if (subproblem) postMessage({ command: 'enumerate', filters: subproblem.unionFilter })
        if (i++ > 5) {
          // Allow thresholds to be resolved, accept requests from coordinator
          postMessage({ resultType: 'checkin' })
          return
        }
      }
      postMessage({ resultType: 'done' })
      break
    }
    case 'threshold':
      computeWorker.setThreshold(data.threshold)
      splitWorker.setThreshold(data.threshold)
      break  // Must not send 'done'
    case "enumerate":
      computeWorker.enumerate(data.filters)
      if (!data.interrupt)
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
