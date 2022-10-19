import { reduceFormula } from '../../../../Formula/addedUtils';
import { optimize, OptNode, precompute } from '../../../../Formula/optimization';
import type { InterimResult, Setup } from './BackgroundWorker';
import { ArtifactBuildData, ArtifactsBySlot, ArtifactsBySlotVec, Build, DynStat, filterArts2, mergePlot, PlotData, reaffine } from './common';
import { ArtSetExclusionFull, countBuildsU, SubProblem, unionFilterUpperLower } from './subproblemUtil';

function checkArtSetExclusion(setKeyCounts: DynStat, excl: ArtSetExclusionFull) {
  let pass = Object.entries(setKeyCounts).every(([setKey, num]) => {
    if (!excl[setKey]) return true
    return !excl[setKey].includes(num)
  })
  if (!pass) return false

  if (!excl['uniqueKey']) return true

  const nRainbow = Object.values(setKeyCounts).reduce((a, b) => a + (b % 2), 0)
  return !excl['uniqueKey'].includes(nRainbow)
}

export class ComputeWorker {
  builds: Build[] = []
  buildValues: number[] = []
  plotData: PlotData | undefined
  plotBase: OptNode | undefined
  threshold: number = -Infinity
  maxBuilds: number
  min: number[]

  arts: ArtifactsBySlot
  artsVec: ArtifactsBySlotVec
  nodes: OptNode[]

  callback: (interim: InterimResult) => void

  constructor({ arts, artsVec, optimizationTarget, constraints: filters, plotBase, maxBuilds }: Setup, callback: (interim: InterimResult) => void) {
    this.arts = arts
    this.artsVec = artsVec
    this.min = filters.map(x => x.min)
    this.maxBuilds = maxBuilds
    this.callback = callback
    this.nodes = filters.map(x => x.node)
    this.nodes.push(optimizationTarget)
    if (plotBase) {
      this.plotData = {}
      this.plotBase = plotBase
      this.nodes.push(plotBase)
    }
    this.nodes = optimize(this.nodes, {}, _ => false)
  }

  computeU(newThreshold: number, subproblem: SubProblem) {
    if (this.threshold < newThreshold) this.threshold = newThreshold
    const { filters, artSetExclusion } = subproblem
    const self = this // `this` in nested functions means different things

    const totalCount = countBuildsU(filters)
    const { lower, upper, maxw } = unionFilterUpperLower(filters)
    if (maxw[maxw.length - 1] < this.threshold) {
      this.interimReport({ tested: 0, failed: 0, skipped: totalCount })
      return
    }

    let nodes = [...this.nodes]
    let min = [...this.min]
    if (this.plotBase !== undefined) nodes.push(this.plotBase);
    // let { statsMin, statsMax } = unionFilterUpperLower(this.arts, filter)
    const statsMin: DynStat = Object.fromEntries(this.artsVec.keys.map((k, i) => ([k, lower[i]])))
    const statsMax: DynStat = Object.fromEntries(this.artsVec.keys.map((k, i) => ([k, upper[i]])))
    nodes = reduceFormula(nodes, statsMin, statsMax)
    const reaff = reaffine(nodes, this.arts)
    nodes = reaff.nodes
    const preArts = reaff.arts

    // const [compute, mapping, buffer] = precompute(nodes, f => f.path[1])
    const unionArts = filters.map(filter => {
      const a = filterArts2(preArts, filter.filterVec)
      return Object.values(a.values)
        .sort((a, b) => a.length - b.length)
    })
    const compute = precompute(nodes, preArts.base, f => f.path[1], 5)  // should p much always be 5
    const buffer = Array<ArtifactBuildData>(5)
    let count = { tested: 0, failed: 0, skipped: 0 }

    function permute(i: number, j: number, setKeyCounts: DynStat) {
      if (j < 0) {
        const result = compute(buffer)
        if (min.some((m, i) => m > result[i]) || !checkArtSetExclusion(setKeyCounts, artSetExclusion)) {
          count.failed++
          return
        }

        const value = result[min.length], { builds, buildValues, plotData, threshold } = self
        let build: Build | undefined
        if (value >= threshold) {
          build = { value, artifactIds: buffer.map(x => x.id) }
          builds.push(build)
          buildValues.push(value)
        }
        if (plotData) {
          const x = result[min.length + 1]
          if (!plotData[x] || plotData[x]!.value < value) {
            if (!build) build = { value, artifactIds: buffer.map(x => x.id) }
            build.plot = x
            plotData[x] = build
          }
        }
        return
      }

      unionArts[i][j].forEach(art => {
        buffer[j] = art

        setKeyCounts[art.set ?? ''] = 1 + (setKeyCounts[art.set ?? ''] ?? 0)
        permute(i, j - 1, setKeyCounts)
        setKeyCounts[art.set ?? ''] -= 1
        if (setKeyCounts[art.set ?? ''] === 0) delete setKeyCounts[art.set ?? '']
      })

      if (j === 0) count.tested += unionArts[i][j].length
    }

    // 4. Set up buffer with `preArts.base`
    // for (const [key, value] of Object.entries(preArts.base)) {
    //   const i = mapping[key]
    //   if (i !== undefined) buffer[i] = value
    // }

    // 5. permute all combinations
    for (let i = 0; i < unionArts.length; i++) {
      buffer.fill({ id: '', values: {} })
      permute(i, unionArts[i].length - 1, {})
    }

    this.interimReport(count)
    return this.threshold
  }

  refresh(force: boolean): void {
    const { maxBuilds } = this
    if (Object.keys(this.plotData ?? {}).length >= 100000)
      this.plotData = mergePlot([this.plotData!])

    // I need frequent updating of threshold
    if (true || this.builds.length >= 100000 || force) {
      this.builds = this.builds
        .sort((a, b) => b.value - a.value)
        .slice(0, maxBuilds)
    }
  }
  interimReport = (count: { tested: number, failed: number, skipped: number }, forced = false) => {
    this.refresh(forced)
    this.callback({ command: "interim", buildValues: this.buildValues, ...count })
    this.buildValues = []
    count.tested = 0
    count.failed = 0
    count.skipped = 0
  }
}
