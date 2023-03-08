import { BNBVecEnumerateWorker } from "./BNBVecEnumerateWorker";
import { BNBCommand, BNBResult } from "./BNBVecSolver";

declare function postMessage(command: BNBCommand | BNBResult): void

let computeWorker: BNBVecEnumerateWorker

onmessage = async (e: MessageEvent<BNBCommand>) => {
  const { data } = e, { command } = data
  switch (command) {
    case 'setup':
      computeWorker = new BNBVecEnumerateWorker(data, x => postMessage(x))
      console.log('CONSTRUCT SPLITTER I GUESS?')
      postMessage({ resultType: 'done' })
      break
    case 'split':
      postMessage({ command: 'enumerate', filters: data.subproblem.unionFilters })
      await Promise.resolve()  // in case a `threshold` is sent over
      postMessage({ resultType: 'done' })
      break
    case 'threshold':
      computeWorker.setThreshold(data.threshold)
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
