import { ArtSetExclusion } from "../../Database/DataManagers/BuildSettingData"
import { OptNode } from "../../Formula/optimization"
import { ArtifactsBySlot, Build, PlotData, RequestFilter, artSetPerm, filterFeasiblePerm } from "../common"
import { SolverBase, SourcedInterimResult, FinalizeResult, OptProblemInput } from "../SolverBase"

export class EnumerationSolver extends SolverBase<WorkerCommand, WorkerResult> {
  protected makeWorker(): Worker { return new Worker(new URL('./BackgroundWorker.ts', import.meta.url)) }
  protected startWorkers(): void {
    for (let i = 0; i < this.numWorkers; i++) {
      const setup: Setup = {
        command: "setup",
        id: i, arts: this.arts,
        optimizationTarget: this.opt,
        plotBase: this.plotBase,
        maxBuilds: this.topN,
        filters: this.constraints,
      }

      this.workers[i].postMessage(setup)
    }

    const countCommand: WorkerCommand = { command: 'count', exclusion: this.artSetExcl, arts: [this.arts] }
    this.workers[0].postMessage(countCommand)
  }

  protected splittingWorkers = new Set<number>()
  private minFilterCount = 16_000_000
  private unprunedFilters: Iterator<RequestFilter>
  private requestFilters: RequestFilter[]
  private maxRequestFilterInFlight: number
  constructor(input: OptProblemInput) {
    super(input)

    // Initialization for EnumerationSolver.
    const setPerms = filterFeasiblePerm(artSetPerm(this.artSetExcl, Object.values(this.arts.values).flatMap(x => x.map(x => x.set!))), this.arts)
    this.unprunedFilters = setPerms[Symbol.iterator]()
    this.requestFilters = []
    this.maxRequestFilterInFlight = input.numWorkers * 16
  }

  protected ipc(result: WorkerResult): void {
    switch (result.command) {
      case "split":
        if (result.filter) {
          this.requestFilters.push(result.filter);
          this.splittingWorkers.add(result.id);
        } else {
          this.splittingWorkers.delete(result.id)
        }
        this.idleWorkers.push(result.id);
        break;
      case "iterate":
        this.idleWorkers.push(result.id);
        break;
      case "count": {
        const [pruned] = result.counts;
        this.computeStatus.total = pruned;
        // this.computeStatus.skipped += prepruned - pruned;
        break;
      }
      default:
        console.log('DEBUG', result);
    }
  }

  // Handle Work Distribution
  private getTreshold(): number {
    return this.wrap.buildValues[this.topN - 1].val;
  }

  private fetchContinueWork(): WorkerCommand {
    return {
      command: 'split',
      filter: undefined,
      minCount: this.minFilterCount,
      threshold: this.getTreshold(),
    };
  }

  private fetchPruningWork(): WorkerCommand | undefined {
    const { done, value } = this.unprunedFilters.next();
    return done
      ? undefined
      : {
        command: 'split',
        minCount: this.minFilterCount,
        threshold: this.getTreshold(),
        filter: value,
      };
  }
  private fetchRequestWork(): WorkerCommand | undefined {
    const filter = this.requestFilters.pop();
    return !filter
      ? undefined
      : {
        command: 'iterate',
        threshold: this.getTreshold(),
        filter,
      };
  }
  protected afterOnMessage() {
    while (this.idleWorkers.length) {
      const id = this.idleWorkers.pop()!,
        worker = this.workers[id];
      let work: WorkerCommand | undefined;
      if (this.requestFilters.length < this.maxRequestFilterInFlight) {
        work = this.fetchPruningWork();
        if (!work && this.splittingWorkers.has(id)) {
          work = this.fetchContinueWork();
        }
      }
      if (!work) {
        work = this.fetchRequestWork();
      }

      if (work) {
        worker.postMessage(work);
      } else {
        this.idleWorkers.push(id);
        if (this.idleWorkers.length === this.numWorkers) {
          const command: WorkerCommand = { command: 'finalize' };
          this.workers.forEach(worker => worker.postMessage(command));
        }
        break
      }
    }
  }
}

export type WorkerCommand = Setup | Split | Iterate | Finalize | Count
export type WorkerResult = SourcedInterimResult | SplitResult | IterateResult | FinalizeResult | CountResult

export interface Setup {
  command: "setup"

  id: number
  arts: ArtifactsBySlot

  optimizationTarget: OptNode
  filters: { value: OptNode, min: number }[]
  plotBase: OptNode | undefined,
  maxBuilds: number
}
export interface Split {
  command: "split"
  threshold: number
  minCount: number
  filter?: RequestFilter
}
export interface Iterate {
  command: "iterate"
  threshold: number
  filter: RequestFilter
}

export interface Finalize {
  command: "finalize"
}
export interface Count {
  command: "count"
  arts: ArtifactsBySlot[]
  exclusion: ArtSetExclusion
}
export interface SplitResult {
  command: "split"
  id: number
  filter: RequestFilter | undefined
}
export interface IterateResult {
  command: "iterate"
  id: number
}
export interface CountResult {
  command: "count"
  counts: number[]
}
