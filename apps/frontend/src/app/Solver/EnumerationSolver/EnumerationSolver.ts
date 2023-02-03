import { ArtSetExclusion } from "../../Database/DataManagers/BuildSettingData";
import { OptNode } from "../../Formula/optimization";
import { ArtifactsBySlot, Build, PlotData, RequestFilter } from "../../PageCharacter/CharacterDisplay/Tabs/TabOptimize/common";
import { SolverBase, SourcedInterimResult, FinalizeResult } from "../SolverBase";

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
