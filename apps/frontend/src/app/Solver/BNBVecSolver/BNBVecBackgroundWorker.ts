import { BNBCommand, BNBResult } from "./BNBVecSolver";

declare function postMessage(command: BNBCommand | BNBResult): void

onmessage = async (e: MessageEvent<BNBCommand>) => {
  const { data } = e, { command } = data
  switch (command) {
    case 'setup':
      console.log('CONSTRUCT SPLITTER I GUESS?')
      break
    case 'split':
      console.log('not implemented')
      return
  }
  postMessage({ resultType: 'done' })
}
