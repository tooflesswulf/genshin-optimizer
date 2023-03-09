import { BNBVecEnumerateWorker } from "./BNBVecEnumerateWorker";
import { BNBCommand, BNBResult } from "./BNBVecSolver";
import { BNBVecSplitWorker } from "./BNBVecSplitWorker";

declare function postMessage(command: BNBCommand | BNBResult): void

let computeWorker: BNBVecEnumerateWorker, splitWorker: BNBVecSplitWorker
let maxIterateSize: number

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
      splitWorker.addSubproblem(data.subproblem)
      maxIterateSize = data.maxIterateSize
    // eslint-disable-next-line no-fallthrough
    case 'resume': {
      let i = 0
      for (const subproblem of splitWorker.split(maxIterateSize)) {
        console.log('what is happening', splitWorker.threshold)
        if (subproblem) postMessage({ command: 'enumerate', filters: subproblem.unionFilter })
        if (i++ > 5) {
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
      console.log('what is happening??!?', splitWorker.threshold)
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
