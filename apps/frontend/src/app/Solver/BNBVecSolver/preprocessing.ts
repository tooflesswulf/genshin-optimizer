// import { ArtifactSetKey } from "@genshin-optimizer/consts"
// import { ArtSetExclusion } from "../../Database/DataManagers/BuildSettingData"
// import { forEachNodes, mapFormulas } from "../../Formula/internal"
// import { OptNode } from "../../Formula/optimization"
// import { constant, customRead, prod, sum, threshold } from "../../Formula/utils"
// import { ArtifactBuildData, ArtifactsBySlot, DynStat } from "../common"
// import { foldProd, foldSum, reduceFormula } from "./boundedFormulaUtils"

// /** Delete/shift unsatisfiable thresholds() nodes due to artifact exclusion rules */
// export function thresholdExclusions(nodes: OptNode[], excl: ArtSetExclusion) {
//   nodes = mapFormulas(nodes, n => n, n => {
//     switch (n.operation) {
//       case 'threshold': {
//         const [branch, branchVal, ge, lt] = n.operands
//         if (branch.operation === 'read' && branchVal.operation === 'const') {
//           const key = branch.path[1] as ArtifactSetKey
//           if (excl[key] === undefined) break
//           const exc = excl[key] as (2 | 4)[]
//           if (branchVal.value === 2 && exc.includes(2)) {
//             if (exc.includes(4)) return lt
//             return threshold(branch, 4, ge, lt)
//           }
//           if (branchVal.value === 4 && exc.includes(4)) return lt
//         }
//         return n
//       }
//       default:
//         return n
//     }
//     return n
//   })
//   return nodes
// }

// /** Convert threshold(v1, v2, ge, 0) -> ge * threshold(v1, v2, 1, 0) */
// export function thresholdToConstBranchForm(nodes: OptNode[]) {
//   return mapFormulas(nodes, n => n, n => {
//     switch (n.operation) {
//       case "threshold":
//         {
//           const [branch, bval, ge, lt] = n.operands
//           if (branch.operation === 'const' && bval.operation === 'const') {
//             return branch.value >= bval.value ? ge : lt
//           }
//           if (branch.operation === 'threshold' && bval.operation === 'const') {
//             // Reserved for non-stacking buffs
//             const [br2, bv2, ge2, lt2] = branch.operands
//             if (br2.operation === 'read' && bv2.operation === 'const' && ge2.operation === 'const' && lt2.operation === 'const') {
//               const left = ge2.value >= bval.value ? ge : lt
//               const right = lt2.value >= bval.value ? ge : lt

//               console.log('non-stacking buff', n, threshold(br2, bv2, left, right))
//               return threshold(br2, bv2, left, right)
//             }
//             console.log('faulty node:', n)
//             throw Error('Not Implemented: nested threshold must follow the form [read, const, const, const]')
//           }
//           if (ge.operation !== 'const' || lt.operation !== 'const') {
//             if (lt.operation === 'const' && lt.value === 0) {
//               return prod(threshold(branch, bval, 1, 0), ge)
//             }
//             console.log('faulty node:', n)
//             throw Error('Not Implemented: threshold() node with non-constant `pass` AND non-zero `fail`')
//           }

//           if (branch.operation !== 'read') {
//             console.log('faulty node:', n)
//             throw Error('Not Implemented: threshold() node with non-read `branch`')
//           }
//           return n
//         }
//       default:
//         return n
//     }
//   })
// }

// function slotUpperLower(a: ArtifactBuildData[]) {
//   if (a.length === 0) return { statsMin: {}, statsMax: {} }
//   // Assume keys are the same for all artifacts.
//   const keys = Object.keys(a[0].values)
//   const statsMin: DynStat = {}
//   const statsMax: DynStat = {}
//   const sets = new Set<ArtifactSetKey>()
//   keys.forEach(k => { statsMin[k] = Infinity; statsMax[k] = -Infinity })
//   for (let i = 0; i < a.length; i++) {
//     for (let j = 0; j < keys.length; j++) {
//       const k = keys[j]
//       statsMin[k] = Math.min(a[i].values[k], statsMin[k])
//       statsMax[k] = Math.max(a[i].values[k], statsMax[k])
//     }
//     const aiset = a[i].set
//     if (aiset) sets.add(aiset)
//   }
//   sets.forEach(set => { statsMax[set] = 1; statsMin[set] = 0 })
//   if (sets.size === 1) {
//     const [s] = sets
//     statsMin[s] = 1
//   }
//   return { statsMin, statsMax }
// }

// function statsUpperLower(a: ArtifactsBySlot) {
//   const statsMin: DynStat = { ...a.base }
//   const statsMax: DynStat = { ...a.base }
//   Object.entries(a.values).forEach(([slotKey, slotArts]) => {
//     const { statsMin: statsMinSlot, statsMax: statsMaxSlot } = slotUpperLower(slotArts)
//     Object.keys(statsMinSlot).forEach(sk => {
//       statsMin[sk] = statsMinSlot[sk] + (statsMin[sk] ?? 0)
//       statsMax[sk] = statsMaxSlot[sk] + (statsMax[sk] ?? 0)
//     })
//   })
//   return { statsMin, statsMax }
// }

// export function makeid(length: number, disallowed?: string[]) {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   for (let _ = 0; _ < 5; _++) {
//     let result = '';
//     for (let i = 0; i < length; i++)
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     if (disallowed && disallowed.includes(result)) continue
//     return result;
//   }
//   throw Error('Too many collisions in `makeid`')
// }

// function isShallow(f: OptNode) {
//   if (f.operation === 'const' || f.operation === 'read' || f.operation === 'threshold') return true
//   if (f.operation !== 'add') return false
//   return f.operands.every(n => n.operation === 'const' || n.operation === 'read' || n.operation === 'threshold')
// }

// function deleteKey(a: ArtifactsBySlot, key: string) {
//   delete a.base[key]
//   a.values.flower.forEach(art => delete art.values[key])
//   a.values.plume.forEach(art => delete art.values[key])
//   a.values.sands.forEach(art => delete art.values[key])
//   a.values.goblet.forEach(art => delete art.values[key])
//   a.values.circlet.forEach(art => delete art.values[key])
// }

// /**
//  * Folds the formula along addable parameters. For example:
//  *            `atk + 790 * atk_ + 667` <=> `kf3Dk`
//  *   where
//  * @param arts     ArtifactsBySlot, modified in-place
//  * @param nodes Objective function and/or constraints
//  */
// function collapseAffine(arts: ArtifactsBySlot, nodes: OptNode[]) {
//   const allKeys = Object.keys(arts.base)
//   const addedRegisters = {} as { [key: string]: { base: number, coeff: number, sumKeys: string[] } }
//   function distributeProd(n: OptNode, v: number) {
//     if (!isShallow(n)) throw Error('`distribute` only works on shallow node type.')
//     if (v === 1) return n
//     switch (n.operation) {
//       case 'threshold': {
//         const [branch, bval, ge, lt] = n.operands
//         if (branch.operation === 'read') {
//           return threshold(branch, bval, foldProd([ge, constant(v)]), foldProd([lt, constant(v)]), { source: branch.path[1] as ArtifactSetKey })
//         }
//         console.log(n)
//         throw Error('branch is not read...?')
//       }
//       case 'const':
//         return constant(v * n.value)
//       case 'add':
//         return sum(...n.operands.map(ni => distributeProd(ni, v)))
//       case 'read': {
//         const newID = makeid(5, [...allKeys, ...Object.keys(addedRegisters)])
//         addedRegisters[newID] = { base: 0, coeff: v, sumKeys: [n.path[1]] }
//         return customRead(['dyn', newID])
//       }
//       default:
//         throw Error('`preprocessing::collapseAffine::distributeProd` only works on shallow node type')
//     }
//   }

//   const newNodes = mapFormulas(nodes, n => n, f => {
//     switch (f.operation) {
//       case 'mul': {
//         let fMops = f.operands
//         if (fMops.some(n => n.operation === 'mul')) {
//           const toFold = fMops.filter(n => n.operation === 'mul').flatMap(n => [...n.operands])
//           const orig = fMops.filter(n => n.operation !== 'mul')
//           fMops = [...orig, ...toFold]
//         }
//         if (fMops.every(isShallow) && fMops.some(n => n.operation === 'const')) {
//           const coeff = fMops.reduce((coeff, n) => n.operation === 'const' ? coeff * n.value : coeff, 1)
//           const todistrib = fMops.filter(n => n.operation !== 'const')
//           if (todistrib.length === 0) return constant(coeff)
//           const mapped = distributeProd(todistrib.pop()!, coeff)

//           if (todistrib.length === 0) return mapped
//           return prod(mapped, ...todistrib)
//         }
//         return f
//       }
//       case 'add': {
//         let fAops = f.operands
//         if (fAops.some(n => n.operation === 'add')) {
//           const toFold = fAops.filter(n => n.operation === 'add').flatMap(n => [...n.operands])
//           const goodboyes = fAops.filter(n => n.operation !== 'add')
//           fAops = [...goodboyes, ...toFold]
//         }
//         if (fAops.filter(n => n.operation === 'const' || n.operation === 'read').length > 1) {
//           const nofold = fAops.filter(n => n.operation !== 'const' && n.operation !== 'read')
//           const tofold = fAops.filter(n => n.operation === 'const' || n.operation === 'read')
//           const newID = makeid(5, [...allKeys, ...Object.keys(addedRegisters)])
//           const base = tofold.reduce((tot, n) => n.operation === 'const' ? tot + n.value : tot, 0)
//           const sumKeys = tofold.map(n => n.operation === 'read' ? n.path[1] : undefined).filter(n => n) as string[]
//           addedRegisters[newID] = { base, coeff: 1, sumKeys }

//           if (nofold.length === 0) return customRead(['dyn', newID])
//           return sum(...nofold, customRead(['dyn', newID]))
//         }
//         return f
//       }
//       default:
//         return f
//     }
//   })

//   // Add `addedRegisters` to all the stats
//   const instKeys = new Set(Object.keys(arts.base))
//   const resolveQueue = Object.entries(addedRegisters)
//   while (resolveQueue.length > 0) {
//     const [s, { base, coeff, sumKeys }] = resolveQueue.shift()!
//     if (!sumKeys.every(k => instKeys.has(k))) {
//       resolveQueue.push([s, { base, coeff, sumKeys }])
//       continue
//     }

//     const getV = (stats: DynStat) => { return coeff * sumKeys.reduce((v, key) => v + stats[key], 0) }

//     arts.base[s] = base + getV(arts.base)
//     arts.values.flower.forEach(art => art.values[s] = getV(art.values))
//     arts.values.plume.forEach(art => art.values[s] = getV(art.values))
//     arts.values.sands.forEach(art => art.values[s] = getV(art.values))
//     arts.values.goblet.forEach(art => art.values[s] = getV(art.values))
//     arts.values.circlet.forEach(art => art.values[s] = getV(art.values))

//     instKeys.add(s)
//   }

//   // Remove all unused keys from all the stats
//   const unusedKeys = new Set<string>(instKeys)
//   forEachNodes(newNodes, _ => { /* do nothing */ }, n => {
//     if (n.operation === 'read') unusedKeys.delete(n.path[1])
//   })
//   unusedKeys.forEach(k => deleteKey(arts, k))

//   return { arts, nodes: newNodes }
// }

// export function elimLinDepStats(arts: ArtifactsBySlot, nodes: OptNode[]) {
//   // Step 1. Find all constants and eliminate them from the equation.
//   const { statsMin, statsMax } = statsUpperLower(arts)
//   nodes = reduceFormula(nodes, statsMin, statsMax);

//   // Step 2. Find all sums of variables and constants, and combine these values into named registers
//   ({ arts, nodes } = collapseAffine(arts, nodes))

//   // Step 3. Use Gaussian elimination to find all linear dependencies
//   const allKeys = Object.keys(arts.base)
//   const allStats = [arts.base, ...Object.values(arts.values).flatMap(slotArts => slotArts.map(art => art.values))]

//   const rows = allKeys.length
//   const cols = allStats.length

//   const mat = allKeys.map(k => allStats.map(dyn => dyn[k]))
//   const record: number[][] = Array(rows).fill(0).map(_ => Array(rows).fill(0))
//   for (let i = 0; i < rows; i++) record[i][i] = 1

//   const selectedPivots = new Set<number>()
//   for (let c = 0; c < cols; c++) {
//     let pivot = -1
//     for (let r = 0; r < rows; r++) {
//       if (selectedPivots.has(r)) continue
//       if (Math.abs(mat[r][c]) > 1e-8) {
//         pivot = r
//         break
//       }
//     }
//     if (pivot < 0) continue

//     selectedPivots.add(pivot)
//     const j = pivot

//     for (let r = 0; r < rows; r++) {
//       if (selectedPivots.has(r)) continue
//       if (Math.abs(mat[r][c]) > 1e-8) {
//         const coeff = mat[r][c] / mat[j][c]
//         mat[r] = mat[r].map((mr, i) => mr - coeff * mat[j][i])
//         record[r] = record[r].map((ri, i) => ri - coeff * record[j][i])  // record all the pivots
//       }
//     }
//     if (selectedPivots.size === rows) break
//   }
//   if (selectedPivots.size === rows) return { arts, nodes }  // Full rank -> no useless stats

//   // Step 4. Eliminate the found dependencies.
//   for (let n = 0; n < rows; n++) {
//     if (!selectedPivots.has(n)) {
//       // If the row is linearly dependent on some shit
//       const depOn = record[n]
//         .map((ri, i) => ({ w: i === n ? 0 : -ri, key: allKeys[i] }))
//         .filter(({ w }) => Math.abs(w) > 1e-8)

//       if (depOn.some(({ w }) => w < 0)) continue  // Ignore lindep if any negative coeff
//       const replaceWith = foldSum(depOn.map(({ w, key }) => w === 1 ? customRead(['dyn', key]) : prod(w, customRead(['dyn', key]))))
//       nodes = mapFormulas(nodes, n => n, f => {
//         if (f.operation === 'read' && f.path[1] === allKeys[n]) return replaceWith
//         return f
//       })
//       deleteKey(arts, allKeys[n])
//     }
//   }

//   return { arts, nodes }
// }
