import type { Interim } from '..'
import type { BNBRequestFilter, SetupBNB } from './BNBVecSolver'
import { ArtifactsBySlot, Build, PlotData } from '../utils/common'
import { ArtSetExclusionFull, filterArtsVec } from '../utils/commonVec'
import { OptNode, optimize } from '../../Formula/optimization'

export class BNBVecEnumerateWorker {
  builds: Build[] = []
  buildValues?: number[]
  plotData?: PlotData
  topN: number
  min: number[]
  exclusion: ArtSetExclusionFull

  arts: ArtifactsBySlot
  nodes: OptNode[]

  callback: (interim: Interim) => void

  constructor({ arts, nodes, minimums, topN, artSetExclusion }: SetupBNB, callback: (interim: Interim) => void) {
    this.arts = arts
    this.min = minimums
    this.topN = topN
    this.callback = callback
    this.nodes = nodes
    this.exclusion = artSetExclusion
    this.nodes = optimize(this.nodes, {}, _ => false)
  }

  enumerate(filters: BNBRequestFilter[]) {
    const { min } = this, self = this // `this` in nested functions means different things
    let preArts = filterArtsVec(this.arts, )
  }
}
