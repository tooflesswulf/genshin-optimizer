import { ArtifactSetKey, allArtifactSetKeys } from "@genshin-optimizer/consts"
import { customMapFormula, forEachNodes, mapFormulas } from "../../Formula/internal"
import { OptNode } from "../../Formula/optimization"
import { deepCmpNode, hashNode } from "../../Formula/utils"
import { cartesian } from "../../Util/Util"
import { makeid } from "./preprocessing"

type SumFactors = {
  $k: number
  terms: number[]  // terms are pointers to atoms. { $k: 2, terms: [0, 1, 4] } equals (2 * atom[0] * atom[1] * atom[4])
}[]
export type ExpandedFormulas = {
  formulas: SumFactors[]
  atoms: OptNode[]
}

function sumMT(...mterms: SumFactors[]): SumFactors {
  return mterms.flat()
}
function prodMT(...mterms: SumFactors[]): SumFactors {
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
        return sumMT(...f.operands.map(n => map(n)))
      case 'mul':
        return prodMT(...f.operands.map(n => map(n)))
      case 'const':
        return [{ $k: f.value, terms: [] }]
      default:
        return [{ $k: 1, terms: [lookup(f)] }]
    }
  })

  // Merge products w/ the same atoms
  sortFactors(formulas)
  formulas = foldFactors(formulas)
  return filterProductPossible2({ formulas, atoms })
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

// Assumes `fs` is already sorted. Does not modify
function foldFactors(formulas: SumFactors[]): SumFactors[] {
  return formulas.map(factors => {
    const newFactors = [] as SumFactors
    let prv: SumFactors[0] | undefined = undefined
    factors.forEach(factor => {
      if (prv && prv.terms.every((pi, i) => pi === factor.terms[i])) {
        prv.$k += factor.$k
        return
      }
      prv = { ...factor }
      newFactors.push(prv)
      return
    })
    return newFactors
  })
}

// Modifies in place
function filterProductPossible2(formulas: ExpandedFormulas, numSlots = 5) {
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
      if (slotsUsed > numSlots) {
        console.log('deleted ', terms)
      }
      return slotsUsed <= numSlots
    })
  )
  return formulas
}





// export type Monomial = {
//   coeff: number
//   terms: string[]
// }
// export type ExpandedPolynomial = {
//   terms: Monomial[]
//   nodes: Dict<string, OptNode>
// }

// export function sumM(...monomials: Monomial[][]): Monomial[] {
//   return monomials.flat()
// }
// export function prodM(...monomials: Monomial[][]): Monomial[] {
//   return cartesian(...monomials).map(monos => monos.reduce((ret, nxt) => {
//     ret.coeff *= nxt.coeff
//     ret.terms.push(...nxt.terms)
//     return ret
//   }, { coeff: 1, terms: [] }))
// }
// export function constantM(v: number): Monomial[] { return [{ coeff: v, terms: [] }] }
// export function readM(tag: string): Monomial[] { return [{ coeff: 1, terms: [tag] }] }

// /**
//  * Factors damage formula into sums of monomials in each variable.
//  * For example:  (1700 * atk_ + atk) * (1 + cr * cd) * (1 + sum_frac(EM))
//  *   -> 1700 * atk_ + 1700 * atk_ * cr * cd + 1700 * atk_ * sum_frac(EM) + 1700 * atk_ * cr * cd * sum_frac(EM)
//  *            + atk +         atk * cr * cd +         atk * sum_frac(EM) +         atk * cr * cd * sum_frac(EM)
//  *
//  * For a total of 8 terms, since there are 3 pairs of additions, for 2^3 sum-of-product terms.
//  *
//  * isVar() is used to check whether any node should be considered a variable on its own.
//  */
// type NodeLinkedList = { n: OptNode, tag: string, next: NodeLinkedList | undefined }
// export function expandPoly(node: OptNode, inheritTags?: string[]): ExpandedPolynomial {
//   const varMap = {} as Dict<number, NodeLinkedList> // my shitty hashmap
//   const tagMap = {} as Dict<string, OptNode>
//   const varTags = inheritTags ?? []
//   function lookup(n: OptNode) {
//     const hsh = hashNode(n)
//     let z = varMap[hsh]
//     while (z !== undefined) {
//       if (deepCmpNode(z.n, n)) return z.tag
//       z = z.next
//     }
//     const newTag = makeid(10, varTags)
//     varMap[hsh] = { n, tag: newTag, next: varMap[hsh] }
//     tagMap[newTag] = n
//     varTags.push(newTag)
//     return newTag
//   }

//   const stat2tag = {} as Dict<string, string>
//   forEachNodes([node], _ => { /* do nothing */ }, n => {
//     if (n.operation === 'read') stat2tag[n.path[1]] = lookup(n)
//   })

//   function toSOP(n: OptNode): Monomial[] {
//     switch (n.operation) {
//       case 'add':
//         return sumM(...n.operands.map(toSOP))
//       case 'mul':
//         return prodM(...n.operands.map(toSOP))
//       case 'const':
//         return constantM(n.value)
//       default:
//         return readM(lookup(n))
//     }
//   }

//   // let sop = toSOP(node)
//   const sop = foldLikeTerms(toSOP(node))
//   return filterProductPossible({
//     terms: sop,
//     nodes: tagMap,
//   })
// }

// function countSlotUsage(node: OptNode): StrictDict<ArtifactSetKey, number> {
//   const ret = {} as StrictDict<ArtifactSetKey, number>
//   if (node.operation === 'add') {
//     return node.operands.map(n => countSlotUsage(n)).reduce((a, b) => {
//       Object.entries(b).forEach(([slotKey, n]) => a[slotKey] = Math.min(n, a[slotKey] ?? 0))
//       return a
//     }, ret)
//   }
//   else if (node.operation === 'mul') {
//     return node.operands.map(n => countSlotUsage(n)).reduce((a, b) => {
//       Object.entries(b).forEach(([slotKey, n]) => a[slotKey] = Math.max(n, a[slotKey] ?? 0))
//       return a
//     }, ret)
//   }
//   else if (node.operation === 'threshold') {
//     const [branch, branchVal] = node.operands
//     if (branch.operation === 'read' && (allArtifactSetKeys as readonly string[]).includes(branch.path[1])
//       && branchVal.operation === 'const') {
//       ret[branch.path[1]] = branchVal.value
//       return ret
//     }
//   }
//   return ret
// }

// function filterProductPossible({ terms, nodes }: ExpandedPolynomial, slotsLeft = 5) {
//   const sCount = Object.fromEntries(Object.entries(nodes).map(([tag, n]) => [tag, countSlotUsage(n)]))

//   terms = terms.filter(({ terms }) => {
//     const slotUsage = terms.reduce((tot, s) => {
//       Object.entries(sCount[s]).forEach(([slotKey, n]) => tot[slotKey] = Math.max(n, tot[slotKey] ?? 0))
//       return tot
//     }, {} as StrictDict<ArtifactSetKey, number>)
//     return Object.values(slotUsage).reduce((a, b) => a + b, 0) <= slotsLeft
//   })
//   return { terms, nodes }
// }

// export function foldLikeTerms(mono: Monomial[]): Monomial[] {
//   const mon = [...mono]
//   mon.forEach(m => m.terms.sort())
//   mon.sort(({ terms: termsA }, { terms: termsB }) => {
//     if (termsA.length !== termsB.length) return termsA.length - termsB.length
//     for (let i = 0; i < termsA.length; i++) {
//       if (termsA[i] !== termsB[i]) return termsA[i] < termsB[i] ? -1 : 1
//     }
//     return 0
//   })

//   for (let i = mon.length - 2; i >= 0; i--) {
//     const a = mon[i].terms
//     const b = mon[i + 1].terms
//     if (a.length !== b.length) continue
//     if (a.every((ai, i) => ai === b[i])) {
//       mon[i].coeff = (mon[i].coeff ?? 0) + (mon[i + 1].coeff ?? 0)
//       mon.splice(i + 1, 1)
//     }
//   }
//   return mon
// }
