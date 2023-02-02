import { SlotKey, Rarity } from "@genshin-optimizer/consts"
import { SubstatKey } from "@genshin-optimizer/pipeline"
import { NumNode } from "../../../../Formula/type"
import { DynStat } from "../TabOptimize/common"

export type GaussianMixture = {
  gmm: {
    phi: number,  // Item weight; must sum to 1.
    cp: number,   // Constraint probability
    mu: number,
    sig2: number
  }[],
  lower: number,
  upper: number,
}
export type Query = {
  formulas: NumNode[],
  curBuild: QueryBuild,

  thresholds: number[],
  evalFn: (values: DynStat) => StructuredNumber[],
  skippableDerivs: boolean[],
}
export type QueryResult = {
  id: string,
  rollsLeft: number,
  subs: SubstatKey[],
  statsBase: DynStat,
  evalFn: (values: DynStat) => StructuredNumber[],
  skippableDerivs: boolean[],

  prob: number,
  upAvg: number,
  distr: GaussianMixture,
  thresholds: number[],
  fourthsubOpts?: { sub: SubstatKey, subprob: number }[],

  evalMode: 'fast' | 'slow',
}
type StructuredNumber = {
  v: number,
  grads: number[],
}

export type QueryArtifact = {
  id: string,
  level: number,
  rarity: Rarity,
  slot: SlotKey,
  values: DynStat,
  subs: SubstatKey[]
}
export type QueryBuild = { [key in SlotKey]: QueryArtifact | undefined }
export type UpgradeOptResult = {
  query: Query,
  arts: QueryResult[],
}
