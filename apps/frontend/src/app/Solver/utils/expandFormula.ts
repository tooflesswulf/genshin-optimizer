import { ArtifactSetKey, allArtifactSetKeys } from "@genshin-optimizer/consts"
import { customMapFormula } from "../../Formula/internal"
import { OptNode } from "../../Formula/optimization"
import { deepCmpNode } from "../../Formula/utils"
import { cartesian, reindex } from "../../Util/Util"
import { DynMinMax } from "./common"
import { simplifyFormula } from "./boundedFormulaUtils"

type SumFactors = {
  $k: number
  terms: number[]  // terms are pointers to atoms. { $k: 2, terms: [0, 1, 4] } equals (2 * atom[0] * atom[1] * atom[4])
}[]
export type ExpandedFormulas = {
  formulas: SumFactors[]
  atoms: OptNode[]
}

function sumSF(...mterms: SumFactors[]): SumFactors {
  return mterms.flat()
}
function prodSF(...mterms: SumFactors[]): SumFactors {
  return cartesian(...mterms).map(mterm => mterm.reduce((ret, nxt) => {
    ret.$k *= nxt.$k
    ret.terms.push(...nxt.terms)
    return ret
  }, { $k: 1, terms: [] }))
}

/**
 * Factors damage formula into sums of monomials in each variable.
 * For example:  (1700 * atk_ + atk) * (1 + cr * cd) * (1 + sum_frac(EM))
 *   -> 1700 * atk_ + 1700 * atk_ * cr * cd + 1700 * atk_ * sum_frac(EM) + 1700 * atk_ * cr * cd * sum_frac(EM)
 *            + atk +         atk * cr * cd +         atk * sum_frac(EM) +         atk * cr * cd * sum_frac(EM)
 *
 * for a total of 8 terms, since there are 3 pairs of additions giving 2^3 expanded terms.
 */
export function expandFormulas(nodes: OptNode[]): ExpandedFormulas {
  const atomMap = new Map<OptNode, number>()
  const atoms: OptNode[] = []
  function lookup(n: OptNode) {
    const i = atomMap.get(n)
    if (i !== undefined) return i

    for (let j = 0; j < atoms.length; j++) {
      if (deepCmpNode(n, atoms[j])) {
        atomMap.set(n, j)
        return j
      }
    }

    atoms.push(n)
    atomMap.set(n, atoms.length - 1)
    return atoms.length - 1
  }

  // Expand all nodes into sums of products of atoms
  let formulas = customMapFormula<'_', SumFactors, OptNode>(nodes, '_', (f, ctx, _map) => {
    const { operation } = f
    const map: (op: OptNode) => SumFactors = (op) => _map(op, ctx)

    switch (operation) {
      case 'add':
        return sumSF(...f.operands.map(n => map(n)))
      case 'mul':
        return prodSF(...f.operands.map(n => map(n)))
      case 'const':
        return [{ $k: f.value, terms: [] }]
      default:
        return [{ $k: 1, terms: [lookup(f)] }]
    }
  })

  // Merge products w/ the same atoms
  sortFactors(formulas)
  formulas = foldFactors(formulas)
  return filterProductPossible({ formulas, atoms })
}

// sorts in place
function sortFactors(formulas: SumFactors[]) {
  formulas.forEach(f => {
    f.forEach(n => n.terms.sort((a, b) => a - b))
    f.sort(({ terms: t1 }, { terms: t2 }) => {
      if (t1.length !== t2.length) return t1.length - t2.length
      for (let i = 0; i < t1.length; i++)
        if (t1[i] !== t2[i]) return t1[i] - t2[i]
      return 0
    })
  })
}

// Assumes `formulas` is already sorted. Does not modify
function foldFactors(formulas: SumFactors[]): SumFactors[] {
  return formulas.map(factors => {
    const newFactors = [] as SumFactors
    let prv: SumFactors[0] | undefined = undefined
    factors.forEach(({ $k, terms }) => {
      if (prv && prv.terms.length === terms.length && prv.terms.every((pi, i) => pi === terms[i])) {
        prv.$k += $k
        return
      }
      prv = { $k, terms }
      newFactors.push(prv)
      return
    })
    return newFactors
  })
}

// Modifies in place
function filterProductPossible(formulas: ExpandedFormulas, numSlots = 5) {
  // Deletes factors (products of threshold() nodes) that are always zero due to slot limitations
  const atomSlotUsage = formulas.atoms.map(n => {
    const ret = {} as StrictDict<ArtifactSetKey, number>
    if (n.operation === 'threshold') {
      const [branch, branchVal, , lt] = n.operands
      if (branch.operation === 'read' && (allArtifactSetKeys as readonly string[]).includes(branch.path[1])
        && branchVal.operation === 'const' && lt.operation === 'const' && lt.value === 0) {
        ret[branch.path[1]] = branchVal.value
      }
    }
    return ret
  })

  formulas.formulas = formulas.formulas.map(factors =>
    factors.filter(({ terms }) => {
      const slotUsage = terms.reduce((tot, i) => {
        Object.entries(atomSlotUsage[i]).forEach(([setKey, n]) => tot[setKey] = Math.max(n, tot[setKey] ?? 0))
        return tot
      }, {} as StrictDict<ArtifactSetKey, number>)
      const slotsUsed = Object.values(slotUsage).reduce((a, b) => a + b, 0)
      return slotsUsed <= numSlots
    })
  )
  return formulas
}

export function simplifyExpandedFormula({ formulas, atoms }: ExpandedFormulas, minMax: DynMinMax): ExpandedFormulas {
  const atoms2 = simplifyFormula(atoms, minMax)
  // todo? check if atoms2 has sum/product forms; happens when min/max gets simplified out
  // todo: remove atoms not unsed in the formulas

  const newAtoms = atoms2.filter(atm => atm.operation !== 'const')
  const atomRix = reindex(atoms2.map(atm => atm.operation !== 'const'))

  const newFormulas = formulas.map(factors =>
    factors.map(({ $k, terms }) => {
      const newK = terms.reduce((k, i) => {
        const atm = atoms2[i]
        if (atm.operation === 'const') return k * atm.value
        return k
      }, $k)
      const newTerms = terms.filter(i => atomRix[i] >= 0).map(i => atomRix[i])
      return { $k: newK, terms: newTerms }
    })
  )

  sortFactors(newFormulas)
  return { formulas: foldFactors(newFormulas), atoms: newAtoms }
}
