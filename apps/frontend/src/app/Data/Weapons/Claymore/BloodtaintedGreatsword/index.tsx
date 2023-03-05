import { WeaponKey } from '@genshin-optimizer/consts'
import { WeaponData } from '@genshin-optimizer/pipeline'
import { input } from '../../../../Formula'
import { equal, subscript } from '../../../../Formula/utils'
import { cond, st } from '../../../SheetUtil'
import { IWeaponSheet } from '../../IWeaponSheet'
import { dataObjForWeaponSheet } from '../../util'
import WeaponSheet, { headerTemplate } from '../../WeaponSheet'
import data_gen_json from './data_gen.json'

const key: WeaponKey = "BloodtaintedGreatsword"
const data_gen = data_gen_json as WeaponData

const dmgInc = [0.12, 0.15, 0.18, 0.21, 0.24]
const [condPassivePath, condPassive] = cond(key, "BaneOfFireAndThunder")
const all_dmg_ = equal("on", condPassive, subscript(input.weapon.refineIndex, dmgInc))
const data = dataObjForWeaponSheet(key, data_gen, {
  premod: {
    all_dmg_
  }
})

const sheet: IWeaponSheet = {
  document: [{
    value: condPassive,
    path: condPassivePath,
    name: st("enemyAffected.pyroOrElectro"),
    header: headerTemplate(key, st("conditional")),
    states: {
      on: {
        fields: [{
          node: all_dmg_,
        }]
      }
    }
  }],
}
export default new WeaponSheet(key, sheet, data_gen, data)