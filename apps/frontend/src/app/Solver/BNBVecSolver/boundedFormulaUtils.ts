import { mapFormulas } from "../../Formula/internal"
import { OptNode, allOperations } from "../../Formula/optimization"
import { constant, prod, sum } from "../../Formula/utils"
import { DynStat } from "../common"

export function foldSum(nodes: readonly OptNode[]) {
  if (nodes.length === 1) return nodes[0]
  nodes = nodes.flatMap(n => n.operation === 'add' ? n.operands : n)
  const constVal = nodes.reduce((pv, n) => n.operation === 'const' ? pv + n.value : pv, 0)
  nodes = nodes.filter(n => n.operation !== 'const')

  if (nodes.length === 0) return constant(constVal)
  if (constVal === 0) {
    if (nodes.length === 1) return nodes[0]
    return sum(...nodes)
  }
  return sum(...nodes, constant(constVal))
}

export function foldProd(nodes: readonly OptNode[]) {
  if (nodes.length === 1) return nodes[0]
  nodes = nodes.flatMap(n => n.operation === 'mul' ? n.operands : n)
  const constVal = nodes.reduce((pv, n) => n.operation === 'const' ? pv * n.value : pv, 1)
  nodes = nodes.filter(n => n.operation !== 'const')

  if (nodes.length === 0) return constant(constVal)
  if (constVal === 1) return prod(...nodes)
  return prod(...nodes, constant(constVal))
}

/** Simplifies formula by substituting fixed stats */
export function reduceFormula(f: OptNode[], lower: DynStat, upper: DynStat) {
  const fixedStats = Object.keys(lower).filter(statKey => lower[statKey] === upper[statKey])
  const f2 = mapFormulas(f, n => n, n => {
    switch (n.operation) {
      case 'add':
        return foldSum(n.operands)
      case 'mul':
        return foldProd(n.operands)

      case 'read':
        if (fixedStats.includes(n.path[1])) return constant(lower[n.path[1]])
        return n
      case 'threshold': {
        const [branch, branchVal, ge, lt] = n.operands
        if (branch.operation === 'const' && branchVal.operation === 'const')
          return branch.value >= branchVal.value ? ge : lt
        if (branch.operation === 'read' && branchVal.operation === 'const') {
          if (lower[branch.path[1]] >= branchVal.value) return ge
          if (upper[branch.path[1]] < branchVal.value) return lt
        }
        return n
      }
      case 'min': case 'max':
      case 'res': case 'sum_frac':
        if (n.operands.every(ni => ni.operation === 'const')) {
          const out = allOperations[n.operation](n.operands.map(ni => ni.operation === 'const' ? ni.value : NaN))
          return constant(out)
        }
        return n
      default:
        return n
    }
  })

  return f2
}
