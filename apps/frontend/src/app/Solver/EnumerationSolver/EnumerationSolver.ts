import { ArtSetExclusion } from "../../Database/DataManagers/BuildSettingData";
import { OptNode } from "../../Formula/optimization";
import { ArtifactsBySlot, RequestFilter, artSetPerm, filterFeasiblePerm } from "../common";
import { SolverBase, SourcedInterimResult, FinalizeResult, OptProblemInput } from "../SolverBase";

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

    const countCommand: WorkerCommand = {command: 'count', exclusion: this.artSetExcl, arts: [this.arts]}
    this.workers[0].postMessage(countCommand)
  }

  private minFilterCount = 16_000_000
  private unprunedFilters: Iterator<RequestFilter>
  private requestFilters: RequestFilter[]

  constructor(input: OptProblemInput) {
    super(input)

    // Initialization for EnumerationSolver.
    const setPerms = filterFeasiblePerm(artSetPerm(this.artSetExcl, Object.values(this.arts.values).flatMap(x => x.map(x => x.set!))), split)
    this.unprunedFilters = setPerms[Symbol.iterator]()
    this.requestFilters = []
  }

  protected ipc(result: WorkerResult): void {
    switch (result.command) {
      case "split":
        // this.cancel()
        throw new Error('Not implemented.')
        break
      case "iterate":
        // this.cancel()
        throw new Error('Not implemented.')
        break
      case "count":
        // this.cancel()
        throw new Error('Not implemented.')
        break
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
  filter: RequestFilter | undefined
}
export interface IterateResult {
  command: "iterate"
}
export interface CountResult {
  command: "count"
  counts: number[]
}
