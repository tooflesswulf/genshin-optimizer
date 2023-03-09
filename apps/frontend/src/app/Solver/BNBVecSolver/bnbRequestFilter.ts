// Utility functions for dealing with Union of BNBFilter(s)

import { ArtifactSlotKey, allArtifactSlotKeys } from "@genshin-optimizer/consts";
import { ArtifactsBySlot } from "../utils/common";
import { objectKeyMap } from "../../Util/Util";
import { BNBRequestFilter } from "./bnbSubproblem";
import { ArtifactsBySlotVec, filterArtsIx, filterArtsVec, statsUpperLowerVec } from "../utils/commonVec";

export function countFilterSize(filters: BNBRequestFilter[]) {
  return filters.reduce((tot, { filter }) =>
    tot + allArtifactSlotKeys.reduce((_cnt, slot) => _cnt * filter[slot].length, 1), 0)
}

export function filterArtsBNB(arts: ArtifactsBySlot, { filter }: BNBRequestFilter): ArtifactsBySlot {
  return {
    base: arts.base,
    values: objectKeyMap(allArtifactSlotKeys, slot =>
      filter[slot].map(ix => arts.values[slot][ix])
    )
  }
}

export function filterMinMax(filters: BNBRequestFilter[]): Omit<BNBRequestFilter, 'filter'> {
  if (filters.length === 0)
    return { lower: [], upper: [], minLinBuf: [], maxLinBuf: [] }
  const out = {
    lower: [...filters[0].lower],
    upper: [...filters[0].upper],
    minLinBuf: [...filters[0].minLinBuf],
    maxLinBuf: [...filters[0].maxLinBuf],
  }

  filters.forEach(({ lower, upper, maxLinBuf, minLinBuf }) => {
    for (let i = 0; i < lower.length; i++) {
      out.lower[i] = Math.min(lower[i], out.lower[i])
      out.upper[i] = Math.max(upper[i], out.upper[i])
    }
    for (let j = 0; j < minLinBuf.length; j++) {
      out.minLinBuf[j] = Math.min(minLinBuf[j], out.minLinBuf[j])
      out.maxLinBuf[j] = Math.max(maxLinBuf[j], out.maxLinBuf[j])
    }
  })
  return out
}

export function updateLinBuf(artsVec: ArtifactsBySlotVec, filters: BNBRequestFilter[]) {
  filters.forEach(filter => {
    const artsv = filterArtsIx(artsVec, filter.filter)
    const { minLinBuf, maxLinBuf } = statsUpperLowerVec(artsv)
    filter.minLinBuf = minLinBuf
    filter.maxLinBuf = maxLinBuf
  })
}

export function unionFilterArts(filters: BNBRequestFilter[]): StrictDict<ArtifactSlotKey, number[]> {
  return objectKeyMap(allArtifactSlotKeys, slotKey => {
    return [...new Set(filters.flatMap(({ filter }) => filter[slotKey]))]
  })
}
