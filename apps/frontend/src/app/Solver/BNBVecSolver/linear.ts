import { OptNode } from "../../Formula/optimization"
import { ExpandedPolynomial, Monomial, constantM, foldLikeTerms, prodM, readM, sumM } from "./polynomial"

export type LinearForm = {
  keys: string[]
  w: number[]
  c: number
  err: number
}

/**
 * First converts a product of variables (including max, min, sum_frac, threshold, etc.) to
 *   a pure product form consisting of only `read` and `const` nodes, guaranteeing the
 *   product form is an upper bound.
 *
 * Then on the product form, create a linear upper bound using `lub` and return it.
 *
 * @param node The formula to expand
 * @param lower Stat lower bounds
 * @param upper Stat upper bounds
 * @returns
 */
export function toLinearUpperBound({ nodes, terms }: ExpandedPolynomial, lower: DynStat, upper: DynStat): LinearForm {
  const stat2tag = {} as Dict<string, string>
  Object.entries(nodes).forEach(([tag, n]) => {
    if (n.operation === 'read') stat2tag[n.path[1]] = tag
  })

  const linerr = 0
  function toPureRead(n: OptNode): Monomial[] {
    switch (n.operation) {
      case 'const':
        return constantM(n.value)
      case 'read':
        return readM(stat2tag[n.path[1]]!)
      case 'add':
        return sumM(...n.operands.map(toPureRead))
      case 'mul':
        return prodM(...n.operands.map(toPureRead))

      case 'threshold': {
        const [branch, bval, ge, lt] = n.operands
        if (branch.operation === 'read' && bval.operation === 'const'
          && lt.operation === 'const' && ge.operation === 'const') {
          if (ge.value < lt.value) {
            console.log(n)
            throw Error('Not Implemented (threshold must be increasing)')
          }

          const key = branch.path[1]
          if (lower[key] >= bval.value) return constantM(ge.value)
          if (upper[key] < bval.value) return constantM(lt.value)

          const slope = (ge.value - lt.value) / (bval.value - lower[key])
          const mon1 = prodM(constantM(slope), readM(stat2tag[branch.path[1]]!))

          const intercept = lt.value - slope * lower[key]
          if (intercept === 0) return mon1
          return sumM(constantM(intercept), mon1)
          // if (lt.value === 0) return mon1
          // return sumM(constantM(lt.value), mon1)
        }
        console.log(n)
        throw Error('Not Implemented (threshold must branch between constants)')
      }
      case 'res': {
        const op = handleResArg(n, lower, upper)
        return toPureRead(op)
      }

      case 'min': case 'max': {
        let [rop, cop] = n.operands
        if (cop.operation !== 'const')
          [rop, cop] = [cop, rop]  // Assume min(const, read)
        if (n.operation === 'min') return toPureRead(rop)

        if (cop.operation === 'const') {
          const thresh = cop.value
          const [minVal, maxVal] = minMax(rop, lower, upper)
          if (minVal > thresh) return toPureRead(rop)
          if (thresh > maxVal) return constantM(thresh)

          // rescale `rop` to be above thresh, since max(f, 0) is a convex function
          const m = (maxVal - thresh) / (maxVal - minVal)
          const b = thresh - m * minVal
          return sumM(constantM(b), prodM(constantM(m), toPureRead(rop)))
        }
        console.log(n)
        throw Error('Not Implemented (max between two non-constants)')
      }
      case 'sum_frac': {
        const [em, denom] = n.operands
        if (denom.operation !== 'const') throw Error('Not Implemented (non-constant sum_frac denominator)')

        const [minEM, maxEM] = minMax(em, lower, upper)
        const k = denom.value
        // The sum_frac form is concave, so any Taylor expansion of EM / (EM + k) gives an upper bound.
        // We can solve for the best Taylor approximation location with the following formula.
        const loc = Math.sqrt((minEM + k) * (maxEM + k)) - k
        const below = (k + loc) * (k + loc)
        const slope = k / below
        const c = loc * loc / below

        // TODO: update linerr
        return sumM(constantM(c), prodM(constantM(slope), toPureRead(em)))
      }
      default:
        console.log(n)
        throw Error('Not Implemented')
    }
  }

  // 1. Turn all nodes into linear upper bounds
  const nodesToMap = Object.fromEntries(Object.entries(nodes).filter(([tag, n]) => n.operation !== 'read').map(([tag, n]) => [tag, toPureRead(n)]))

  // 2. substitute into `terms` and construct a new SOPForm whose nodes are all pure read nodes
  let t2 = terms.flatMap(({ coeff, terms }) => prodM(constantM(coeff), ...terms.map(t => nodesToMap[t] ?? readM(t))))
  t2 = foldLikeTerms(t2)

  // 2.5 Re-name all the tags to their read node version
  t2 = t2.map(({ coeff, terms }) => {
    terms = terms.map(t => {
      const nt = nodes[t]
      if (!nt || nt.operation !== 'read') throw Error('MUST be a read node.')
      return nt.path[1]
    })
    return { coeff, terms }
  })

  // 3. call lub() on each term
  const lins = t2.map(({ coeff, terms }) => {
    if (terms.length === 0) return { w: {}, c: coeff, err: 0 }
    if (terms.length === 1) return { w: { [terms[0]]: coeff }, c: 0, err: 0 }
    const { w, c, err } = lub(terms.map(k => ({ lower: lower[k], upper: upper[k] })))
    const retw = w.reduce((ret, wi, i) => {
      ret[terms[i]] = wi * coeff + (ret[terms[i]] ?? 0)
      return ret
    }, {} as DynStat)
    return { w: retw, c: coeff * c, err: coeff * err + linerr }
  })

  return lins.reduce((lin, l) => {
    lin.c += l.c; lin.err += l.err
    Object.entries(l.w).forEach(([k, v]) => lin.w[k] = v + (lin.w[k] ?? 0))
    return lin
  }, { w: {}, c: 0, err: 0 })
}
