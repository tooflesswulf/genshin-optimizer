import { ArtifactSlotKey, allArtifactSetKeys, allArtifactSlotKeys } from "@genshin-optimizer/consts"
import { precompute } from "../../Formula/optimization"
import { range, reindex } from "../../Util/Util"
import { ArtSetExclusionFull, ArtifactsBySlotVec, applyLinAppx } from "../utils/commonVec"
import { ExpandedFormulas, simplifyExpandedFormula } from "../utils/expandFormula"
import { filterMinMax, updateLinBuf } from "./bnbRequestFilter"
import { LinearVec } from "../utils/linearUB"


export type BNBRequestFilter = {
  filter: StrictDict<ArtifactSlotKey, number[]>
  lower: number[], upper: number[]
  minLinBuf: number[], maxLinBuf: number[]
}

type BNBSubproblemBase = {
  targetIxs: number[]
  formulas: ExpandedFormulas
  minimums: number[]
  exclusion: ArtSetExclusionFull
  unionFilter: BNBRequestFilter[]
  depth: number
}
export type BNBSubproblemNoCache = {
  cache: false
} & BNBSubproblemBase
export type BNBSubproblemWithCache = {
  cache: true
  lin: LinearVec[]
} & BNBSubproblemBase
export type BNBSubproblem = BNBSubproblemWithCache

export function pruneSubproblem(threshold: number, subproblem: BNBSubproblem) {
  const { minimums, targetIxs } = subproblem
  const objIx = targetIxs[0]
  const plotIx = targetIxs.length > 1 ? targetIxs[1] : undefined
  const unionFilter = subproblem.unionFilter.filter(({ filter, maxLinBuf }) => {
    const filterSize = allArtifactSlotKeys.reduce((tot, slot) => tot * filter[slot].length, 1)
    return (filterSize > 0 && maxLinBuf[objIx] > threshold) && minimums.every((min, i) => maxLinBuf[i] >= min)
  })

  // TODO: for each filter, remove arts that cannot contribute.
  return { ...subproblem, unionFilter }
}

/**
 * Reduces a subproblem. Returns `undefined` if the subproblem is unsatisfiable.
 *  - Prunes away unsatisfiable filters & arts
 *  - Simplifies formulas according to stat minMax
 *  - Deletes always-satisfied constraints, and re-indexes targetIxs
 *  - Deletes always-satisfied ArtSetExclusions & (weakly) checks that the exclusion is satisfiable
 *
 * @param artsVec       Vector artifacts by slot
 * @param threshold     Objective threshold
 * @param subproblem0   Subproblem to reduce
 * @returns             A smaller subproblem with the same optimal solution as `subproblem0`
 */
export function reduceSubproblem(artsVec: ArtifactsBySlotVec, threshold: number, subproblem0: BNBSubproblem): BNBSubproblem | undefined {
  // 0. prune bad filters & simplify formulas
  applyLinAppx(artsVec, subproblem0.lin)
  updateLinBuf(artsVec, subproblem0.unionFilter)
  subproblem0 = pruneSubproblem(threshold, subproblem0)
  if (subproblem0.unionFilter.length === 0) return undefined
  const { lower, upper } = filterMinMax(subproblem0.unionFilter)
  const minMax = Object.fromEntries(artsVec.keys.map((k, i) => ([k, { min: lower[i], max: upper[i] }])))
  const formulas = simplifyExpandedFormula(subproblem0.formulas, minMax)

  // 1. Check for always-feasible constraints.
  const statsMin = Object.fromEntries(artsVec.keys.map((k, i) => ([k, lower[i]])))
  const statsMax = Object.fromEntries(artsVec.keys.map((k, i) => ([k, upper[i]])))
  const compute = precompute(formulas.atoms, {}, n => n.path[1], 1)
  const atomVals = compute([{ id: '', values: statsMin }])
  const formulaMins = formulas.formulas.map(factors =>
    factors.reduce((tot, { $k, terms }) => tot + terms.reduce((prd, i) => prd * atomVals[i], $k), 0)
  )

  const active = subproblem0.minimums.map((min, i) => {
    return subproblem0.targetIxs.includes(i) || min > formulaMins[i]
  })
  const formulaRix = reindex(active)
  const targetIxs = subproblem0.targetIxs.map(i => formulaRix[i])
  formulas.formulas = formulas.formulas.filter((f, i) => active[i])
  const minimums = subproblem0.minimums.filter((m, i) => active[i])

  // 2. Check for never-active and always-active ArtSetExcl constraints
  // TODO: dont use statsMin and statsMax, implement setKeyMinMax
  const exclusion = {} as ArtSetExclusionFull
  for (const [setKey, exclude] of Object.entries(subproblem0.exclusion)) {
    if (setKey === 'uniqueKey') {
      // TODO: Check and exclude rainbow bullshit.
      exclusion[setKey] = exclude
      const feasibleKeys = allArtifactSetKeys.filter(setKey => statsMax[setKey] > 0)
      let feasible4sets = 0
      let feasible2sets = 0
      feasibleKeys.forEach(k => {
        let allowedCnts = range(statsMin[k], statsMax[k])
        if (subproblem0.exclusion[k])
          allowedCnts = allowedCnts.filter(cnt => !subproblem0.exclusion[k].includes(cnt))

        if (allowedCnts.includes(4) || allowedCnts.includes(5)) feasible4sets++
        if (allowedCnts.includes(2) || allowedCnts.includes(3)) feasible2sets++
      })

      if (exclude.includes(5) && feasible4sets === 0) {
        if (feasible2sets === 0) return; // No feasible 4sets or 2sets along with rainbow5 excluded is never satisfiable
        if (exclude.includes(3) && feasible2sets < 2) return; // No 4sets, rainbow5 excluded, rainbow3 excluded means we need at least 2 2sets
      }
      continue
    }
    const reducedExcl = exclude.filter(n => statsMin[setKey] <= n && n <= statsMax[setKey])        // Cut away never-active
    if (reducedExcl.includes(statsMin[setKey]) && reducedExcl.includes(statsMax[setKey])) return;  // Always active.
    if (reducedExcl.length > 0) exclusion[setKey] = reducedExcl
  }

  return {
    cache: true, lin: subproblem0.lin,
    unionFilter: subproblem0.unionFilter, depth: subproblem0.depth,
    targetIxs, formulas, minimums, exclusion,
  }
}
