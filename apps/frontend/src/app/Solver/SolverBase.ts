import { OptNode } from '../Formula/optimization';
import {
  ArtifactsBySlot,
  Build,
  PlotData,
} from '../PageCharacter/CharacterDisplay/Tabs/TabOptimize/common';
import { ArtSetExclusion } from '../Database/DataManagers/BuildSettingData';
import { BuildStatus } from '../PageCharacter/CharacterDisplay/Tabs/TabOptimize/Components/BuildAlert';
import { range } from '../Util/Util';

export type OptProblemInput = {
  arts: ArtifactsBySlot;
  optimizationTarget: OptNode;
  constraints: { value: OptNode; min: number }[];
  artSet: ArtSetExclusion;

  topN: number;
  plotBase?: OptNode;
  numWorkers: number;
};

export interface InterimResult {
  command: 'interim';
  buildValues?: number[];
  tested: number; // Number of builds since last report (including failed)
  failed: number; // Number of builds that fail ArtsetExcl or constraints
  skipped: number;
}
export interface SourcedInterimResult extends InterimResult {
  source: string;
}
export interface FinalizeResult {
  command: 'finalize';
  builds: Build[];
  plotData?: PlotData;
}

export abstract class SolverBase<
  Command_t,
  Result_t extends { command: string }
> {
  protected arts: ArtifactsBySlot;
  protected opt: OptNode;
  protected constraints: { value: OptNode; min: number }[];
  protected artSetExcl: ArtSetExclusion;
  protected topN: number;
  protected plotBase?: OptNode;

  protected numWorkers: number;
  protected workers: Worker[] = [];

  wrap: { buildValues: { src: string; val: number }[] };
  computeStatus: Omit<BuildStatus, 'type'>;

  callOnWorkerError?: (e: ErrorEvent) => void;
  callOnSuccess?: () => void;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private doCancel: () => void = () => {};
  private cancelled: Promise<void>;
  protected idleWorkers: number[] = [];
  protected splittingWorkers = new Set<number>();

  finalizedList: Promise<FinalizeResult>[] = [];
  finalizer: ((_: FinalizeResult) => void)[] = [];

  constructor(input: OptProblemInput) {
    this.arts = input.arts;
    this.opt = input.optimizationTarget;
    this.constraints = input.constraints;
    this.artSetExcl = input.artSet;
    this.topN = input.topN;
    this.plotBase = input.plotBase;
    this.numWorkers = input.numWorkers;

    this.wrap = {
      buildValues: Array(this.topN)
        .fill(0)
        .map((_) => ({ src: '', val: -Infinity })),
    };
    this.computeStatus = {
      tested: 0,
      failed: 0,
      skipped: 0,
      total: NaN,
      startTime: performance.now(),
    };
    this.cancelled = new Promise((r) => (this.doCancel = r));
  }

  preprocess() {
    // Common pre-processing steps?
  }

  // Work Distribution must be handled by implementation
  protected abstract distributeWork(): void;

  // Runs the main optimization process
  cancel() {
    this.doCancel();
  }
  async solve() {
    this.preprocess();

    this.spawnWorkers();
    this.startWorkers();
    this.distributeWork();
    // Automatically retrieve solutions & return them
    const output = Promise.all(this.finalizedList);
    output.then(() => {
      if (this.callOnSuccess) this.callOnSuccess();
    });
    const results = await Promise.any([output, this.cancelled]);

    return results;
  }

  // Callback hooks for various optimization process events
  onSuccess(onSucc: () => void) {
    this.callOnSuccess = onSucc;
  }
  onWorkerError(onError: (e: ErrorEvent) => void) {
    this.callOnWorkerError = onError;
    this.workers.forEach((w) => w.addEventListener('error', onError));
  }

  // Worker creation and communication
  protected abstract makeWorker(): Worker;
  protected abstract startWorkers(): void;
  private spawnWorkers() {
    for (let i = 0; i < this.numWorkers; i++) {
      const worker = this.makeWorker();
      if (this.callOnWorkerError)
        worker.addEventListener('error', this.callOnWorkerError);

      let finalize: (_: FinalizeResult) => void;
      const finalized = new Promise<FinalizeResult>((r) => (finalize = r));
      worker.onmessage = async ({
        data,
      }: {
        data: Result_t | SourcedInterimResult | FinalizeResult;
      }) => {
        switch (data.command) {
          case 'finalize':
            worker.terminate();
            finalize(data as FinalizeResult);
            break;
          case 'interim':
            this.handleInterim(data as SourcedInterimResult);
            break;
          default:
            this.ipc(data as Result_t, i);
        }
        this.distributeWork();
      };
      this.workers.push(worker);
      this.cancelled?.then(() => worker.terminate());
      this.finalizedList.push(finalized);
    }
    for (let i = 0; i < 3; i++) {
      this.idleWorkers.push(...range(0, this.numWorkers - 1));
    }
  }

  // Detailed inter-process communication must be handled by implementation.
  protected abstract ipc(result: Result_t, i: number): void;
  protected broadcast(cmd: Command_t) {
    this.workers.forEach((worker) => worker.postMessage(cmd));
  }
  protected sendToIdle(cmd: Command_t) {
    const id = this.idleWorkers.pop();
    if (!id) return false;
    this.workers[id].postMessage(cmd);
    return true;
  }

  // Default communication types
  protected handleInterim(result: SourcedInterimResult) {
    this.computeStatus.tested += result.tested;
    this.computeStatus.failed += result.failed;
    this.computeStatus.skipped += result.skipped;
    if (result.buildValues) {
      this.wrap.buildValues.filter(({ src }) => src !== result.source);
      this.wrap.buildValues.push(
        ...result.buildValues.map((val) => ({ src: result.source, val }))
      );
      this.wrap.buildValues.sort((a, b) => b.val - a.val).splice(this.topN);
    }
  }
}