import { ArtifactSetKey, ArtifactSlotKey, allArtifactSetKeys, allArtifactSlotKeys } from "@genshin-optimizer/consts";
import { Interim } from "..";
import { argWhere, cartesian, objectKeyMap, partition } from "../../Util/Util";
import { ArtSetExclusionFull, ArtifactsBySlotVec, applyLinAppx, slotUpperLowerVec } from "../utils/commonVec";
import { linearUBExpanded } from "../utils/linearUB";
import { SetupBNB } from "./BNBVecSolver";
import { countFilterSize, filterMinMax, unionFilterArts, updateLinBuf } from "./bnbRequestFilter";
import { BNBRequestFilter, BNBSubproblem, pruneSubproblem, reduceSubproblem } from "./bnbSubproblem";

const zero = 1e-6

export class BNBVecSplitWorker {
  artsVec: ArtifactsBySlotVec
  exclusion: ArtSetExclusionFull
  threshold = -Infinity
  maxUnionFilterLength = 50  // Dont want to union too many filters

  subproblems: BNBSubproblem[] = []

  interim?: Interim
  callback: (interim: Interim) => void

  constructor({ artsVec, artSetExclusion }: SetupBNB, callback: (interim: Interim) => void) {
    this.artsVec = artsVec
    this.exclusion = artSetExclusion
    this.callback = callback
  }

  setThreshold(threshold: number) {
    this.threshold = Math.max(threshold, this.threshold)
    console.log('updating thr to ', this.threshold)
  }
  addSubproblem(subproblem: BNBSubproblem) { this.subproblems.push(subproblem) }

  split(minCount: number): BNBSubproblem | undefined {
    while (this.subproblems.length) {
      const subproblem = this.subproblems.pop()!
      const count = countFilterSize(subproblem?.unionFilter)
      if (count <= minCount) {
        return subproblem
      }

      const newProblems = this.splitBNB(subproblem)
      const newCount = newProblems.reduce((tot, subp) => tot + countFilterSize(subp.unionFilter), 0)
      if (this.interim) this.interim.skipped += count - newCount
      else this.interim = { resultType: 'interim', tested: 0, failed: 0, skipped: count - newCount, buildValues: undefined }
      this.subproblems.push(...newProblems)
      return
    }
    this.reportInterim(true)
  }

  reportInterim(forced = false) {
    if (this.interim && (forced || this.interim.skipped > 100_000)) {
      this.callback(this.interim)
      this.interim = undefined
    }
  }

  // TODO: figure out logic
  splitOnce() {
    const problem = this.subproblems.pop()
    if (!problem) return
  }

  splitBNB(subproblem: BNBSubproblem): BNBSubproblem[] {
    const threshold = this.threshold
    console.log('thrr', { threshold })

    // 1. discard filters that don't meet threshold(s) & minimums
    applyLinAppx(this.artsVec, subproblem.lin)
    updateLinBuf(this.artsVec, subproblem.unionFilter)
    subproblem = pruneSubproblem(threshold, subproblem)
    const { targetIxs, unionFilter: filters } = subproblem
    const objIx = targetIxs[0]

    // 2. Pick branching method
    let branchProposals = [] as BNBSubproblem[]
    if (filters.length > this.maxUnionFilterLength) {
      // 2a. If too many filters in a unionFilter, split it somehow.
      const newFilts = this.makeRandomBranches(filters, objIx)
      branchProposals = newFilts.map(unionFilter => ({
        ...subproblem, unionFilter
      }))
    }
    else {
      // 2b. Default splitting behavior.
      branchProposals = this.makeBranches(threshold, subproblem).map(unionFilter => ({
        ...subproblem, unionFilter
      }))
    }

    // 3. Perform branching.
    const branches = [] as { problemSize: number, subproblem: BNBSubproblem }[]
    branchProposals.forEach(branch => {
      // 3a. remove trivially bad subproblems
      const numBuilds = countFilterSize(branch.unionFilter)
      if (numBuilds === 0) return

      const sub2 = reduceSubproblem(this.artsVec, threshold, branch)
      if (!sub2) return

      // 3b. perform bounding process
      sub2.depth++
      const { lower, upper } = filterMinMax(sub2.unionFilter)
      const appx = linearUBExpanded(sub2.formulas, { keys: this.artsVec.keys, lower, upper })
      sub2.lin = appx

      // 3c. re-check that everything is okay
      const sub3 = reduceSubproblem(this.artsVec, threshold, sub2)
      if (!sub3) return

      branches.push({ problemSize: countFilterSize(sub3.unionFilter), subproblem: sub3 })
    })

    // reverse sort by size to prioritize smaller problems
    branches.sort((a, b) => b.problemSize - a.problemSize)
    return branches.map(({ subproblem }) => subproblem)
  }

  makeRandomBranches(unionFilter: BNBRequestFilter[], objIx: number) {
    unionFilter.sort((a, b) => a.maxLinBuf[objIx] - b.maxLinBuf[objIx])
    const numSplit = Math.ceil(unionFilter.length / this.maxUnionFilterLength)

    return partition(unionFilter, numSplit)
  }

  makeBranches(threshold: number, subproblem: BNBSubproblem): BNBRequestFilter[][] {
    const { minimums, lin, unionFilter: unionFilters, targetIxs } = subproblem
    const objIx = targetIxs[0]

    if (unionFilters.length === 0) return []
    // applyLinAppx(this.artsVec, lin)  // Already applied
    const { lower, upper, minLinBuf, maxLinBuf } = filterMinMax(unionFilters)
    const artsSel = unionFilterArts(unionFilters)

    // Very roughly: formulaHeur assumes that builds take uniform random values between minLB & maxLB,
    //   then picks the formula with highest prob. it falls below the minimum constraint
    const formulaHeur = minimums.map((min, i) => (min - minLinBuf[i]) / (maxLinBuf[i] - minLinBuf[i]))
    formulaHeur[objIx] = (threshold - minLinBuf[objIx]) / (maxLinBuf[objIx] - minLinBuf[objIx])
    let hMax = subproblem.targetIxs[0]
    formulaHeur.forEach((h, i) => {
      if (lin[i].weights.every(w => w === 0)) return  // don't branch on empty `lin`
      if (formulaHeur[i] < .5) return                // don't branch on min[i] that are likely to be satisfied
      if (formulaHeur[i] > formulaHeur[hMax]) hMax = i
    })

    const linToConsider = lin[hMax]
    const keysToConsider = argWhere(linToConsider.weights, w => w !== 0)
    let branchKey = ''
    if (keysToConsider.length === 0) {
      // corner case when `lin` is empty...?
      // Split by picking most popular set key
      let maxCnt = -1
      allArtifactSetKeys.filter(setKey => upper[setKey] > 0).forEach(setKey => {
        const cnt = allArtifactSlotKeys.reduce((tot, slotKey) =>
          tot + artsSel[slotKey].reduce((tot2, i) =>
            tot2 + (this.artsVec.values[slotKey][i].set === setKey ? 1 : 0), 0), 0)

        if (cnt > maxCnt) {
          maxCnt = cnt
          branchKey = setKey
        }
      })
    }
    else {
      let branchHeur = -1
      keysToConsider.forEach(kix => {
        const postBranchRangeReduction = allArtifactSlotKeys.reduce((rr, slot) => {
          const vals = artsSel[slot].map(i => this.artsVec.values[slot][i].values[kix])
          const minv = Math.min(...vals), maxv = Math.max(...vals)
          if (minv === maxv) return rr

          const bv = (minv + maxv) / 2
          const glb = Math.max(...vals.filter(v => v <= bv))
          const lub = Math.min(...vals.filter(v => v > bv))
          return rr + Math.min(maxv - glb, lub - minv)
        }, 0)

        let heur = linToConsider.weights[kix] * postBranchRangeReduction
        if ((allArtifactSetKeys as readonly string[]).includes(this.artsVec.keys[kix])) heur *= 5
        if (heur > branchHeur) {
          branchKey = this.artsVec.keys[kix]
          branchHeur = heur
        }
      })
    }

    const branchIx = this.artsVec.keys.indexOf(branchKey)
    if (branchIx < 0) {
      console.error('===================== SHATTER BROKE ====================', { lin, artsVec: this.artsVec, artsSel }, { branchKey, branchIx })
      throw Error('Could not find branch key (should never happen)')
    }

    if ((allArtifactSetKeys as readonly string[]).includes(branchKey)) {
      // branch on setkey
      const branches = this.branchOnSetKey(branchKey as ArtifactSetKey, unionFilters)
      return branches
    }
    else {
      // branch on value
      const targetBranchVal = (lower[branchIx] + upper[branchIx]) / 2
      const branches = this.branchOnValue(branchIx, targetBranchVal, unionFilters)
      return branches
    }
  }

  /** Partitions filters into 3 groups based on artifact set key: [0/1, 2/3, 4/5] */
  branchOnSetKey(setKey: ArtifactSetKey, filters: BNBRequestFilter[]): BNBRequestFilter[][] {
    const partitions = filters.map(({ filter }) =>
      objectKeyMap(allArtifactSlotKeys, slot => {
        const artsSlot = this.artsVec.values[slot]
        const slotPartition = filter[slot].map(i => artsSlot[i].set === setKey ? 1 : 0)
        return slotPartition
      })
    )

    const group01 = [] as BNBRequestFilter[]
    const group23 = [] as BNBRequestFilter[]
    const group45 = [] as BNBRequestFilter[]
    const selector = [group01, group01, group23, group23, group45, group45]  // This is a switch statement
    this.partitionSlots(partitions, filters).forEach(partedFilter => {
      cartesian(partedFilter.flower, partedFilter.plume, partedFilter.sands, partedFilter.goblet, partedFilter.circlet)
        .forEach(slots => {
          const [flower, plume, sands, goblet, circlet] = slots.map(({ ixs }) => ixs)
          const { upper, lower } = mergeSlots(this.artsVec.base, slots)
          const toPush: BNBRequestFilter = {
            filter: { flower, plume, sands, goblet, circlet },
            lower, upper, minLinBuf: [], maxLinBuf: []
          }

          const groupTot = slots.reduce((tot, { group }) => tot + group, 0)
          selector[groupTot].push(toPush)
        })
    })

    return [group01, group23, group45]
  }

  /** Splits the filters evenly-ish to be on the left & right of `splitTarg` */
  branchOnValue(kix: number, splitTarg: number, filters: BNBRequestFilter[]): BNBRequestFilter[][] {
    const partitions = filters.map(({ filter }) => this.calculateSplit(kix, splitTarg, filter))

    const groupLower = [] as BNBRequestFilter[]
    const groupUpper = [] as BNBRequestFilter[]
    this.partitionSlots(partitions, filters).forEach(partedFilter => {
      cartesian(partedFilter.flower, partedFilter.plume, partedFilter.sands, partedFilter.goblet, partedFilter.circlet)
        .forEach(slots => {
          const [flower, plume, sands, goblet, circlet] = slots.map(({ ixs }) => ixs)
          const { upper, lower } = mergeSlots(this.artsVec.base, slots)
          const toPush: BNBRequestFilter = {
            filter: { flower, plume, sands, goblet, circlet },
            lower, upper, minLinBuf: [], maxLinBuf: []
          }

          if ((lower[kix] + upper[kix]) / 2 > splitTarg) groupUpper.push(toPush)
          else groupLower.push(toPush)
        })
    })

    return [groupLower, groupUpper]
  }

  /**
   * Splits a filter into low/high so that {low x5}[kix] <= targ <= {high x5}[kix]
   *    while maximizing the size of {low x5} + {high x5}
   *
   * Note that mixed splits like {low, high, low, low, high} are allowed to cross `targ`.
   */
  calculateSplit(kix: number, targ: number, filter: StrictDict<ArtifactSlotKey, number[]>) {
    const artsVec = this.artsVec
    targ = targ - artsVec.base[kix]

    // 1. Select artifacts, discard all the stats except [kix], and keep only unique values
    const artVals = allArtifactSlotKeys.map(slot => {
      const slotVals = filter[slot]
        .map(ix => ({ ixs: [ix], v: artsVec.values[slot][ix].values[kix] }))
        .sort(({ v: v1 }, { v: v2 }) => v1 - v2)

      for (let i = slotVals.length - 1; i > 0; i -= 1) {
        if (slotVals[i].v === slotVals[i - 1].v) {
          slotVals[i - 1].ixs.push(...slotVals[i].ixs)
          slotVals.splice(i, 1)
        }
      }
      return slotVals
    })

    // 2. Find a feasible split
    const x0 = artVals.map(([{ v }]) => v)
    const valRange = artVals.map(vals => vals[vals.length - 1].v - vals[0].v)
    if (valRange.every(vr => vr === 0)) valRange.fill(1)
    const coeff = (targ - x0.reduce((a, b) => a + b)) / valRange.reduce((a, b) => a + b)

    const feas0 = artVals.map((vals, si) => {
      // Implements np.searchsorted(artVals[si], x0[si] + coeff * valRange[si]) for each slot
      let z = -1
      for (let i = 0; i < vals.length; i++) {
        if (vals[i].v >= x0[si] + coeff * valRange[si]) {
          z = i
          break
        }
      }
      if (z < 0) z = vals.length
      return z
    })

    // 3a. Convenience function for checking that a split works
    function isFeasible(split: number[]) {
      let glb = 0, lub = 0
      for (let i = 0; i < artVals.length; i++) {
        const j = split[i]
        glb += artVals[i][j - 1]?.v ?? -Infinity
        lub += artVals[i][j]?.v ?? Infinity
      }
      return glb <= targ + zero && targ <= lub + zero
    }
    function scoreSplit(split: number[]) {
      return split.reduce((ltot, sp) => ltot * sp, 1) + split.reduce((rtot, sp, i) => rtot * (artVals[i].length - sp), 1)
    }

    // 3b. Verify initial solution is feasible
    if (!isFeasible(feas0)) {
      throw new Error('calculateSplit failed! Initial solution infeasible!')
    }

    // 4. Greedy optimization of score function
    const onesteps: readonly number[][] = [[0, 1], [0, -1], [1, 1], [1, -1], [2, 1], [2, -1], [3, 1], [3, -1], [4, 1], [4, -1]]
    const twosteps: readonly number[][] = [[0, 1, -1, -1], [0, 1, -1, 1], [0, 1, 1, -1], [0, 1, 1, 1], [0, 2, -1, -1], [0, 2, -1, 1], [0, 2, 1, -1], [0, 2, 1, 1], [0, 3, -1, -1], [0, 3, -1, 1], [0, 3, 1, -1], [0, 3, 1, 1], [0, 4, -1, -1], [0, 4, -1, 1], [0, 4, 1, -1], [0, 4, 1, 1], [1, 2, -1, -1], [1, 2, -1, 1], [1, 2, 1, -1], [1, 2, 1, 1], [1, 3, -1, -1], [1, 3, -1, 1], [1, 3, 1, -1], [1, 3, 1, 1], [1, 4, -1, -1], [1, 4, -1, 1], [1, 4, 1, -1], [1, 4, 1, 1], [2, 3, -1, -1], [2, 3, -1, 1], [2, 3, 1, -1], [2, 3, 1, 1], [2, 4, -1, -1], [2, 4, -1, 1], [2, 4, 1, -1], [2, 4, 1, 1], [3, 4, -1, -1], [3, 4, -1, 1], [3, 4, 1, -1], [3, 4, 1, 1]]
    function takeStep(feas: number[]) {
      let greedyStep: { score: number, next?: number[] } = { score: scoreSplit(feas) }
      onesteps.forEach(([i, di]) => {
        const split = [...feas]
        split[i] += di
        if (split[i] < 0 || split[i] >= artVals[i].length) return
        if (!isFeasible(split)) return
        const score = scoreSplit(split)
        if (score > greedyStep.score) greedyStep = { score, next: split }
      })
      twosteps.forEach(([i, j, di, dj]) => {
        const split = [...feas]
        split[i] += di
        split[j] += dj
        if (split[i] < 0 || split[i] >= artVals[i].length) return
        if (split[j] < 0 || split[j] >= artVals[j].length) return
        if (!isFeasible(split)) return
        const score = scoreSplit(split)
        if (score > greedyStep.score) greedyStep = { score, next: split }
      })
      return greedyStep.next
    }

    let split = feas0
    let next: number[] | undefined = feas0
    while (next) {
      split = next
      next = takeStep(split)
    }

    return objectKeyMap(allArtifactSlotKeys, (slot, i) => {
      const upperIxs = new Set(artVals[i].slice(split[i]).flatMap(({ ixs }) => ixs))
      return filter[slot].map(ix => upperIxs.has(ix) ? 1 : 0)
    })
  }

  partitionSlots(partitions: StrictDict<ArtifactSlotKey, number[]>[], filters: BNBRequestFilter[], groups: number[] = [0, 1]) {
    return partitions.map((part, i) => {
      const filt = filters[i].filter
      return objectKeyMap(allArtifactSlotKeys, slot => {
        const groupLabel = part[slot]
        const artsSlot = this.artsVec.values[slot]
        return groups.map(g => {
          const ixs = filt[slot].filter((_, j) => groupLabel[j] === g)
          const { upper, lower } = slotUpperLowerVec(ixs.map(ix => artsSlot[ix]))
          return { ixs, upper, lower, group: g }
        })
      })
    })
  }
}

function mergeSlots(base: number[], slots: { upper: number[], lower: number[] }[]): { upper: number[], lower: number[] } {
  return slots.reduce(({ upper, lower }, { upper: ui, lower: li }) => {
    for (let i = 0; i < base.length; i++) {
      upper[i] += ui[i] ?? 0
      lower[i] += li[i] ?? 0
    }
    return { upper, lower }
  }, { upper: [...base], lower: [...base] })
}
