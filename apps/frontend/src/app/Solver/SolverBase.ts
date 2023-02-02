import { OptNode } from "../Formula/optimization";
import { ArtifactsBySlot } from "../PageCharacter/CharacterDisplay/Tabs/TabOptimize/common";
import { ArtSetExclusion } from "../Database/DataManagers/BuildSettingData";

export type OptProblemInput = {
  arts: ArtifactsBySlot,
  optimizationTarget: OptNode,
  constraints: { value: OptNode, min: number }[],
  artSet: ArtSetExclusion,

  topN: number,
  plotBase?: OptNode,
  numWorkers: number,

  url: string,
}

export abstract class SolverBase<Message_t> {
  protected arts: ArtifactsBySlot | string;
  protected opt: OptNode;
  protected constraints: { value: OptNode, min: number }[];

  abstract workerURL: string;
  protected url: string;
  protected numWorkers: number;
  protected workers: Worker[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onWorkerFail: (e: ErrorEvent) => void = () => { };

  constructor(input: OptProblemInput) {
    this.arts = input.arts;
    this.opt = input.optimizationTarget
    this.constraints = input.constraints
    this.numWorkers = input.numWorkers
    this.url = input.url
  }

  preprocess() {
    // Automatic pruning goes here.
  }

  protected abstract _solveImpl(): void
  solve() {
    this.spawnWorkers()
    this.startWorkers()

    this._solveImpl()
    // Automatically retrieve solutions & return them
  }

  private spawnWorkers() {
    // Handle spawning workers
    for (let i = 0; i < this.numWorkers; i++) {
      const worker = new Worker(new URL(this.workerURL, this.url))
      worker.addEventListener("error", this.onWorkerFail);

      this.workers.push(worker)
    }
  }

  protected abstract startWorkers(): void

  // Handle worker communications and task queueing
  protected abstract ipc(cmd: Message_t): void
}

class TestSolver extends SolverBase<number> {
  workerURL = './BackgroundWorker.ts';

  protected startWorkers(): void {
    for (let i = 0; i < this.numWorkers; i++) {
      this.workers[i].postMessage(i)
    }
  }

  protected _solveImpl(): void {
    console.log('pretending to solve haha')
  }
  protected ipc(cmd: number): void {
    throw new Error("Method not implemented.");
  }
}

export function testSolverBase(inp: OptProblemInput) {
  const ts = new TestSolver(inp)

  ts.solve()
}
