import { SubstatKey, allSubstatKeys, ICachedArtifact } from "../../../../Types/artifact"
import Artifact from "../../../../Data/Artifacts/Artifact"
import { DynStat } from "../TabOptimize/common"
import { Data } from "../../../../Formula/type"
import { Query, QueryBuild, QueryResult } from "./artifactQueryTypes"
import { precompute, optimize, OptNode } from "../../../../Formula/optimization"
import { ddx, zero_deriv } from "../../../../Formula/differentiate"


function toStats(build: QueryBuild): DynStat {
  const stats: DynStat = {}
  Object.values(build).forEach(a => {
    if (a) Object.entries(a.values).forEach(([key, value]) => stats[key] = (stats[key] ?? 0) + value)
  })
  return stats
}
export function querySetup(formulas: OptNode[], thresholds: number[], curBuild: QueryBuild, data: Data = {}): Query {
  const toEval: OptNode[] = []
  formulas.forEach(f => {
    toEval.push(f, ...allSubstatKeys.map(sub => ddx(f, fo => fo.path[1], sub)))
  })
  // Opt loop a couple times to ensure all constants folded?
  let evalOpt = optimize(toEval, data, ({ path: [p] }) => p !== "dyn")
  evalOpt = optimize(evalOpt, data, ({ path: [p] }) => p !== "dyn")

  const evalFn = precompute(evalOpt, {}, f => f.path[1], 1)
  const stats = toStats(curBuild)
  const dmg0 = evalFn([{ id: '', values: stats }])[0]

  const skippableDerivs = allSubstatKeys.map(sub => formulas.every(f => zero_deriv(f, f => f.path[1], sub)))
  const structuredEval = (stats: DynStat) => {
    const out = evalFn([{ id: '', values: stats }])
    return formulas.map((_, i) => {
      const ix = i * (1 + allSubstatKeys.length)
      return { v: out[ix], grads: allSubstatKeys.map((sub, si) => out[ix + 1 + si]) }
    })
  }

  return { formulas: formulas, thresholds: [dmg0, ...thresholds], curBuild: curBuild, evalFn: structuredEval, skippableDerivs: skippableDerivs }
}

export function toQueryArtifact(art: ICachedArtifact, fixedLevel?: number) {
  if (fixedLevel === undefined) fixedLevel = art.level
  const mainStatVal = Artifact.mainStatValue(art.mainStatKey, art.rarity, fixedLevel)  // 5* only
  const buildData = {
    id: art.id, slot: art.slotKey, level: art.level, rarity: art.rarity,
    values: {
      [art.setKey]: 1,
      [art.mainStatKey]: art.mainStatKey.endsWith('_') ? mainStatVal / 100 : mainStatVal,
      ...Object.fromEntries(art.substats.map(substat =>
        [substat.key, substat.key.endsWith('_') ? substat.accurateValue / 100 : substat.accurateValue]))
    },
    subs: art.substats.reduce((sub: SubstatKey[], x) => {
      if (x.key !== "") sub.push(x.key)
      return sub
    }, [])
  }
  delete buildData.values[""]
  return buildData
}

export function cmpQuery(a: QueryResult, b: QueryResult) {
  if (b.prob > 1e-5 || a.prob > 1e-5) return b.prob * b.upAvg - a.prob * a.upAvg

  const meanA = a.distr.gmm.reduce((pv, { phi, mu }) => pv + phi * mu, 0)
  const meanB = b.distr.gmm.reduce((pv, { phi, mu }) => pv + phi * mu, 0)
  return meanB - meanA
}
