import { optimize, OptNode, precompute } from '../../Formula/optimization';
import type { Setup } from './EnumerationSolver';
import type { InterimResult } from '../SolverBase';
import { ArtifactBuildData, ArtifactsBySlot, Build, countBuilds, filterArts, mergePlot, PlotData, pruneAll, RequestFilter } from '../common';

export class Enumerator {
  builds: Build[] = [];
  buildValues?: number[];
  plotData?: PlotData;
  threshold = -Infinity
  maxBuilds: number
  min: number[]

  arts: ArtifactsBySlot
  nodes: OptNode[]

  callback: (interim: InterimResult) => void

  constructor({ arts, optimizationTarget, filters, plotBase, maxBuilds }: Setup, callback: (interim: InterimResult) => void) {
    this.arts = arts
    this.min = filters.map(x => x.min)
    this.maxBuilds = maxBuilds
    this.callback = callback
    this.nodes = filters.map(x => x.value)
    this.nodes.push(optimizationTarget)
    if (plotBase) {
      this.plotData = {}
      this.nodes.push(plotBase)
    }
    this.nodes = optimize(this.nodes, {}, _ => false)
  }

  compute(newThreshold: number, filter: RequestFilter) {
    // use enumerate from enumerate.ts maybe?
    throw new Error('Not implemented.')
  }

  refresh(force: boolean): void {
    const { maxBuilds } = this
    if (Object.keys(this.plotData ?? {}).length >= 100000)
      this.plotData = mergePlot([this.plotData!])

    if (this.builds.length >= 1000 || force) {
      this.builds = this.builds
        .sort((a, b) => b.value - a.value)
        .slice(0, maxBuilds)
      this.buildValues = this.builds.map(x => x.value)
      this.threshold = Math.max(this.threshold, this.buildValues[maxBuilds - 1] ?? -Infinity)
    }
  }
}
