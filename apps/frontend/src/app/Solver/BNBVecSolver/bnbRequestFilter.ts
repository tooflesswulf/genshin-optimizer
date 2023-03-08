// Utility functions for dealing with Union of BNBFilter(s)

import { allArtifactSlotKeys } from "@genshin-optimizer/consts";
import { BNBRequestFilter } from "./BNBVecSolver";
import { ArtifactsBySlot } from "../utils/common";
import { objectKeyMap } from "../../Util/Util";

export function countFilterSize(filters: BNBRequestFilter[]) {
  return filters.reduce((tot, { filter }) =>
    tot + allArtifactSlotKeys.reduce((_cnt, slot) => _cnt * filter[slot].length, 1), 0)
}

export function filterArts(arts: ArtifactsBySlot, { filter }: BNBRequestFilter): ArtifactsBySlot {
  return {
    base: arts.base,
    values: objectKeyMap(allArtifactSlotKeys, slot =>
      filter[slot].map(ix => arts.values[slot][ix])
    )
  }
}

export function joinFilters(filters: BNBRequestFilter[]): BNBRequestFilter {
  return {
    filter: filters[0].filter,
    lower: filters[0].lower,
    upper: filters[0].upper,
    minw: filters[0].minw,
    maxw: filters[0].maxw,
  }
}
