import type { Interim } from '..'
import type { BNBRequestFilter, SetupBNB } from './BNBVecSolver'
import { ArtifactBuildData, ArtifactsBySlot, Build, DynStat, PlotData, mergePlot } from '../utils/common'
import { ArtSetExclusionFull, ArtifactsBySlotVec, filterArtsVec } from '../utils/commonVec'
import { OptNode, optimize, precompute } from '../../Formula/optimization'
import { countFilterSize, filterArtsBNB, filterMinMax } from './bnbRequestFilter'
import { simplifyFormula } from '../utils/boundedFormulaUtils'

/* Returns true if `setKeyCounts` respects `excl` */
function checkArtSetExclusion(setKeyCounts: DynStat, excl: ArtSetExclusionFull) {
  const pass = Object.entries(setKeyCounts).every(([setKey, num]) => {
    if (!excl[setKey]) return true
    return !excl[setKey].includes(num)
  })
  if (!pass) return false

  if (!excl['uniqueKey']) return true

  const nRainbow = Object.values(setKeyCounts).reduce((a, b) => a + (b % 2), 0)
  return !excl['uniqueKey'].includes(nRainbow)
}

export class BNBVecEnumerateWorker {
  builds: Build[] = []
  buildValues?: number[]
  plotData?: PlotData
  threshold = -Infinity
  topN: number
  exclusion: ArtSetExclusionFull

  arts: ArtifactsBySlot
  artsVec: ArtifactsBySlotVec
  objIx: number
  plotIx?: number
  nodes: OptNode[]
  min: number[]

  callback: (interim: Interim) => void

  constructor({ arts, artsVec, targetIxs, nodes, minimums, topN, artSetExclusion }: SetupBNB, callback: (interim: Interim) => void) {
    this.arts = arts
    this.artsVec = artsVec
    this.topN = topN
    this.callback = callback
    this.nodes = nodes
    this.min = minimums
    this.exclusion = artSetExclusion
    this.objIx = targetIxs[0]
    if (targetIxs.length > 1) {
      this.plotData = {}
      this.plotIx = targetIxs[1]
    }
    this.nodes = optimize(this.nodes, {}, _ => false)
  }

  setThreshold(newThreshold: number) {
    if (this.threshold > newThreshold) this.threshold = newThreshold
  }
  enumerate(filters: BNBRequestFilter[]) {
    const { min, objIx, plotIx } = this, self = this // `this` in nested functions means different things
    const preArts = this.arts
    const oldMaxBuildCount = this.builds.length

    const { lower, upper } = filterMinMax(filters)
    const minMax = Object.fromEntries(this.artsVec.keys.map((k, i) => ([k, { min: lower[i], max: upper[i] }])))

    let nodes = this.nodes
    nodes = simplifyFormula(nodes, minMax)
    nodes = optimize(nodes, {}, _ => false)

    const artsDOTlen = 5
    const compute = precompute(nodes, preArts.base, f => f.path[1], artsDOTlen)
    const unionArts = filters.map(filter =>
      Object.values(filterArtsBNB(preArts, filter).values).sort((a, b) => a.length - b.length)
    )

    const buffer = Array<ArtifactBuildData>(artsDOTlen)
    const count = { tested: 0, failed: 0, skipped: 0 }

    function permute(i: number, j: number, setKeyCounts: DynStat) {
      if (j < 0) {
        const result = compute(buffer)
        if (min.some((m, i) => m > result[i]) || !checkArtSetExclusion(setKeyCounts, self.exclusion)) {
          count.failed++
          return
        }

        const value = result[objIx], { builds, plotData, threshold } = self
        let build: Build | undefined
        if (value >= threshold) {
          build = { value, artifactIds: buffer.map(x => x.id) }
          builds.push(build)
        }
        if (plotIx !== undefined && plotData) {
          const x = result[plotIx]
          if (!plotData[x] || plotData[x]!.value < value) {
            if (!build) build = { value, artifactIds: buffer.map(x => x.id).filter(id => id) }
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
      if (j === 0) {
        count.tested += unionArts[i][j].length
        if (count.tested > 1 << 16)
          self.interimReport(count)
      }
    }

    for (let i = 0; i < unionArts.length; i++) {
      buffer.fill({ id: '', values: {} })
      permute(i, unionArts[i].length - 1, {})
    }

    this.interimReport(count, this.builds.length > oldMaxBuildCount)
  }

  refresh(force: boolean): void {
    const { topN } = this
    if (Object.keys(this.plotData ?? {}).length >= 100000)
      this.plotData = mergePlot([this.plotData!])

    if (this.builds.length >= 1000 || force) {
      this.builds = this.builds
        .sort((a, b) => b.value - a.value)
        .slice(0, topN)
      this.buildValues = this.builds.map(x => x.value)
      this.threshold = Math.max(this.threshold, this.buildValues[topN - 1] ?? -Infinity)
    }
  }
  interimReport(count: { tested: number, failed: number, skipped: number }, forced = false) {
    this.refresh(forced)
    this.callback({ resultType: "interim", buildValues: this.buildValues, ...count })
    this.buildValues = undefined
    count.tested = 0
    count.failed = 0
    count.skipped = 0
  }
}
