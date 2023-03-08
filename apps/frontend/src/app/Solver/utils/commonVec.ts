import { ArtifactSetKey, allArtifactSetKeys, ArtifactSlotKey, allArtifactSlotKeys } from "@genshin-optimizer/consts"
import { ArtifactsBySlot, RequestFilter } from "./common"
import { objectKeyMap } from "../../Util/Util"
import { LinearVec } from "./linearUB"

// Utility functions for dealing with ArtifactsBySlotVec

/** Converts ArtifactsBySlot to ArtifactsBySlotVec */
export function toArtifactsBySlotVec(arts: ArtifactsBySlot): ArtifactsBySlotVec {
  const allKeys = new Set(Object.keys(arts.base))
  Object.values(arts.values).forEach(slotArts => {
    slotArts.forEach(art => {
      if (art.set) allKeys.add(art.set)
      Object.keys(art.values).forEach(k => allKeys.add(k))
    })
  })

  const allKeysList = [...allKeys]
  const keys = [...allKeysList.filter(k => !(allArtifactSetKeys as readonly string[]).includes(k)), ...allKeysList.filter(k => (allArtifactSetKeys as readonly string[]).includes(k))]

  return {
    keys, baseLinBuf: [],
    base: keys.map(k => arts.base[k] ?? 0),
    values: {
      flower: arts.values.flower.map(({ id, set, values }) => ({ id, set, values: keys.map(k => values[k] ?? (k === set ? 1 : 0)), linBuf: [] })),
      plume: arts.values.plume.map(({ id, set, values }) => ({ id, set, values: keys.map(k => values[k] ?? (k === set ? 1 : 0)), linBuf: [] })),
      sands: arts.values.sands.map(({ id, set, values }) => ({ id, set, values: keys.map(k => values[k] ?? (k === set ? 1 : 0)), linBuf: [] })),
      goblet: arts.values.goblet.map(({ id, set, values }) => ({ id, set, values: keys.map(k => values[k] ?? (k === set ? 1 : 0)), linBuf: [] })),
      circlet: arts.values.circlet.map(({ id, set, values }) => ({ id, set, values: keys.map(k => values[k] ?? (k === set ? 1 : 0)), linBuf: [] })),
    }
  }
}

/** Selects a subset according to filter */
export function filterArtsVec(arts: ArtifactsBySlotVec, filters: RequestFilter): ArtifactsBySlotVec {
  return {
    keys: arts.keys, base: arts.base, baseLinBuf: arts.baseLinBuf,
    values: objectKeyMap(allArtifactSlotKeys, slot => {
      const filter = filters[slot]
      switch (filter.kind) {
        case "id": return arts.values[slot].filter(art => filter.ids.has(art.id))
        case "exclude": return arts.values[slot].filter(art => !art.set || !filter.sets.has(art.set))
        case "required": return arts.values[slot].filter(art => art.set && filter.sets.has(art.set))
      }
    })
  }
}

/** Selects a subset according to filterVec */
export function filterArtsIx(arts: ArtifactsBySlotVec, filterVec: StrictDict<ArtifactSlotKey, number[]>): ArtifactsBySlotVec {
  return {
    keys: arts.keys, base: arts.base, baseLinBuf: [],
    values: objectKeyMap(allArtifactSlotKeys, slot => {
      const filterIxs = filterVec[slot]
      const slotVals = arts.values[slot]
      return filterIxs.map(ix => slotVals[ix])
    })
  }
}

export function slotUpperLowerVec(arts: ArtifactBuildDataVecDense[]) {
  const lower = [...arts[0].values]
  const upper = [...arts[0].values]
  const minw = [...arts[0].linBuf]
  const maxw = [...arts[0].linBuf]
  for (let i = 1; i < arts.length; i++) {
    for (let j = 0; j < lower.length; j++) {
      lower[j] = Math.min(lower[j], arts[i].values[j])
      upper[j] = Math.max(upper[j], arts[i].values[j])
    }
    for (let j = 0; j < minw.length; j++) {
      minw[j] = Math.min(minw[j], arts[i].linBuf[j])
      maxw[j] = Math.max(maxw[j], arts[i].linBuf[j])
    }
  }
  return { lower, upper, minw, maxw }
}
export function statsUpperLowerVec(a: ArtifactsBySlotVec) {
  const lower = [...a.base]
  const upper = [...a.base]
  const minLinBuf = [...a.baseLinBuf]
  const maxLinBuf = [...a.baseLinBuf]
  Object.values(a.values).forEach(slotArts => {
    const slotUL = slotUpperLowerVec(slotArts)
    for (let i = 0; i < lower.length; i++) {
      lower[i] += slotUL.lower[i]
      upper[i] += slotUL.upper[i]
    }
    for (let i = 0; i < minLinBuf.length; i++) {
      minLinBuf[i] += slotUL.minw[i]
      maxLinBuf[i] += slotUL.maxw[i]
    }
  })
  return { lower, upper, minLinBuf, maxLinBuf }
}
export function bufferSlotUpperLower(arts: ArtifactBuildDataVecDense[]) {
  const minw = [...arts[0].linBuf]
  const maxw = [...arts[0].linBuf]
  for (let i = 1; i < arts.length; i++) {
    for (let j = 0; j < minw.length; j++) {
      minw[j] = Math.min(minw[j], arts[i].linBuf[j])
      maxw[j] = Math.max(maxw[j], arts[i].linBuf[j])
    }
  }
  return { minw, maxw }
}
export function bufferUpperLower(a: ArtifactsBySlotVec) {
  const minw = [...a.baseLinBuf]
  const maxw = [...a.baseLinBuf]
  Object.values(a.values).forEach(slotArts => {
    const slotUL = bufferSlotUpperLower(slotArts)
    for (let i = 0; i < minw.length; i++) {
      minw[i] += slotUL.minw[i]
      maxw[i] += slotUL.maxw[i]
    }
  })
  return { minw, maxw }
}

// Modifies in place
export function applyLinAppx(a: ArtifactsBySlotVec, approximations: LinearVec[]) {
  a.baseLinBuf = approximations.map(({ $c, weights }) => {
    return $c + weights.reduce((accum, wi, i) => accum + wi * a.base[i], 0)
  })
  Object.values(a.values).forEach(arts => arts.forEach(art => art.linBuf = approximations.map(({ weights }) => {
    return weights.reduce((acc, wi, i) => acc + wi * art.values[i], 0)
  })))
}

export type ArtifactBuildDataVecDense = {
  id: string
  set?: ArtifactSetKey
  values: number[]
  linBuf: number[]
}
export type ArtifactsBySlotVec = { keys: string[], base: number[], values: StrictDict<ArtifactSlotKey, ArtifactBuildDataVecDense[]>, baseLinBuf: number[] }

export type ArtSetExclusionFull = Dict<Exclude<ArtifactSetKey, "PrayersForDestiny" | "PrayersForIllumination" | "PrayersForWisdom" | "PrayersToSpringtime"> | "uniqueKey", number[]>
