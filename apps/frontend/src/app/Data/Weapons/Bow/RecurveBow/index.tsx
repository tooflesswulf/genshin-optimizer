import { input } from '../../../../Formula'
import { equal, infoMut, prod, subscript } from '../../../../Formula/utils'
import type { WeaponKey } from '@genshin-optimizer/consts'
import { allStats } from '@genshin-optimizer/gi-stats'
import { customHealNode } from '../../../Characters/dataUtil'
import { stg, st } from '../../../SheetUtil'
import { dataObjForWeaponSheet } from '../../util'
import type { IWeaponSheet } from '../../IWeaponSheet'
import WeaponSheet, { headerTemplate } from '../../WeaponSheet'

const key: WeaponKey = 'RecurveBow'
const data_gen = allStats.weapon.data[key]

const healing_s = [0.08, 0.1, 0.12, 0.14, 0.16]
const healing = equal(
  input.weapon.key,
  key,
  customHealNode(
    prod(input.total.hp, subscript(input.weapon.refineIndex, healing_s))
  )
)

const data = dataObjForWeaponSheet(key, data_gen, undefined, { healing })

const sheet: IWeaponSheet = {
  document: [
    {
      header: headerTemplate(key, st('base')),
      fields: [
        {
          node: infoMut(healing, { name: stg('healing'), variant: 'heal' }),
        },
      ],
    },
  ],
}

export default new WeaponSheet(key, sheet, data_gen, data)
