import { ArtifactSetKey, allArtifactSetKeys, ArtifactSlotKey, allArtifactSlotKeys } from "@genshin-optimizer/consts"
import { ArtifactsBySlot, RequestFilter } from "../common"
import { objectKeyMap } from "../../Util/Util"

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
    keys, baseWBuffer: [],
    base: keys.map(k => arts.base[k] ?? 0),
    values: {
      flower: arts.values.flower.map(({ id, set, values }) => ({ id, set, values: keys.map(k => values[k] ?? (k === set ? 1 : 0)), wBuffer: [] })),
      plume: arts.values.plume.map(({ id, set, values }) => ({ id, set, values: keys.map(k => values[k] ?? (k === set ? 1 : 0)), wBuffer: [] })),
      sands: arts.values.sands.map(({ id, set, values }) => ({ id, set, values: keys.map(k => values[k] ?? (k === set ? 1 : 0)), wBuffer: [] })),
      goblet: arts.values.goblet.map(({ id, set, values }) => ({ id, set, values: keys.map(k => values[k] ?? (k === set ? 1 : 0)), wBuffer: [] })),
      circlet: arts.values.circlet.map(({ id, set, values }) => ({ id, set, values: keys.map(k => values[k] ?? (k === set ? 1 : 0)), wBuffer: [] })),
    }
  }
}

/** Selects a subset according to filter */
export function filterArtsVec(arts: ArtifactsBySlotVec, filters: RequestFilter): ArtifactsBySlotVec {
  return {
    keys: arts.keys, base: arts.base, baseWBuffer: arts.baseWBuffer,
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
    keys: arts.keys, base: arts.base, baseWBuffer: [],
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
  const minw = [...arts[0].wBuffer]
  const maxw = [...arts[0].wBuffer]
  for (let i = 1; i < arts.length; i++) {
    for (let j = 0; j < lower.length; j++) {
      lower[j] = Math.min(lower[j], arts[i].values[j])
      upper[j] = Math.max(upper[j], arts[i].values[j])
    }
    for (let j = 0; j < minw.length; j++) {
      minw[j] = Math.min(minw[j], arts[i].wBuffer[j])
      maxw[j] = Math.max(maxw[j], arts[i].wBuffer[j])
    }
  }
  return { lower, upper, minw, maxw }
}
export function statsUpperLowerVec(a: ArtifactsBySlotVec) {
  const lower = [...a.base]
  const upper = [...a.base]
  const minw = [...a.baseWBuffer]
  const maxw = [...a.baseWBuffer]
  Object.values(a.values).forEach(slotArts => {
    const slotUL = slotUpperLowerVec(slotArts)
    for (let i = 0; i < lower.length; i++) {
      lower[i] += slotUL.lower[i]
      upper[i] += slotUL.upper[i]
    }
    for (let i = 0; i < minw.length; i++) {
      minw[i] += slotUL.minw[i]
      maxw[i] += slotUL.maxw[i]
    }
  })
  return { lower, upper, minw, maxw }
}
export function bufferSlotUpperLower(arts: ArtifactBuildDataVecDense[]) {
  const minw = [...arts[0].wBuffer]
  const maxw = [...arts[0].wBuffer]
  for (let i = 1; i < arts.length; i++) {
    for (let j = 0; j < minw.length; j++) {
      minw[j] = Math.min(minw[j], arts[i].wBuffer[j])
      maxw[j] = Math.max(maxw[j], arts[i].wBuffer[j])
    }
  }
  return { minw, maxw }
}
export function bufferUpperLower(a: ArtifactsBySlotVec) {
  const minw = [...a.baseWBuffer]
  const maxw = [...a.baseWBuffer]
  Object.values(a.values).forEach(slotArts => {
    const slotUL = bufferSlotUpperLower(slotArts)
    for (let i = 0; i < minw.length; i++) {
      minw[i] += slotUL.minw[i]
      maxw[i] += slotUL.maxw[i]
    }
  })
  return { minw, maxw }
}

export type ArtifactBuildDataVecDense = {
  id: string
  set?: ArtifactSetKey
  values: number[]
  wBuffer: number[]
}
export type ArtifactsBySlotVec = { keys: string[], base: number[], values: StrictDict<ArtifactSlotKey, ArtifactBuildDataVecDense[]>, baseWBuffer: number[] }

export type ArtSetExclusionFull = Dict<Exclude<ArtifactSetKey, "PrayersForDestiny" | "PrayersForIllumination" | "PrayersForWisdom" | "PrayersToSpringtime"> | "uniqueKey", number[]>
