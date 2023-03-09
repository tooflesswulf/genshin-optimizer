import { ExpandedFormulas, expandFormulas, simplifyExpandedFormula } from "./expandFormula"
import { OptNode, precompute } from "../../Formula/optimization"
import { constant, customRead, max, min, prod, res, sum, threshold, frac } from "../../Formula/utils"
import { DynStat } from "./common"

function evalExpandedFormula({ formulas, atoms }: ExpandedFormulas, x: DynStat) {
  const compute = precompute(atoms, {}, f => f.path[1], 1)
  const atomVals = compute([{ id: '_', values: x }])

  return formulas.map(factors => factors.reduce((tot, { $k, terms }) =>
    tot + terms.reduce((prd, i) => prd * atomVals[i], $k), 0))
}

/* 90/90 Kokomi with Donut */
const hp = sum(customRead(['dyn', 'hp']), prod(13471, customRead(['dyn', 'hp_'])))
const atk = sum(customRead(['dyn', 'atk']), prod(842, customRead(['dyn', 'atk_'])))
const def = sum(customRead(['dyn', 'def']), prod(657, customRead(['dyn', 'def_'])))
const crcd = sum(1, prod(customRead(['dyn', 'critRate_']), customRead(['dyn', 'critDMG_'])))
const crcd0 = sum(1, prod(max(sum(customRead(['dyn', 'critRate_']), -.3), 0), customRead(['dyn', 'critDMG_'])))
const dmg_ = sum(1, customRead(['dyn', 'hydroDmg_']), threshold(customRead(['dyn', 'HeartOfDepth']), 2, .2, 0), threshold(customRead(['dyn', 'HeartOfDepth']), 4, .35, 0))
const er = customRead(['dyn', 'enerRech_'])
const em = sum(1, prod(2.78, frac(customRead(['dyn', 'eleMas']), 1400)))
const ohc = customRead(['dyn', 'OceanHuedClam'])

const x = { 'hp': 13471, 'hp_': .496, 'atk': 842, 'def': 657, 'enerRech_': 1, 'hydroDmg_': .288, 'critDMG_': .5, 'critRate_': .05 }

describe("expandedFormula", () => {
  test("formula equality", () => {
    const fs = [hp, atk, def, dmg_, crcd, crcd0, em, er, ohc, prod(atk, dmg_, crcd, em)]
    const ef = expandFormulas(fs)

    const compute = precompute(fs, {}, f => f.path[1], 1)
    const out = compute([{ id: '', values: x }])
    expect(evalExpandedFormula(ef, x)).toEqual(out)
  })
  test("wacky formula equality", () => {
    const fs = [sum(prod(atk, atk, atk, def, dmg_, crcd0, crcd), prod(atk, hp, hp, er, sum(crcd, ohc)))]
    const ef = expandFormulas(fs)

    const compute = precompute(fs, {}, f => f.path[1], 1)
    const out = compute([{ id: '', values: x }])
    expect(evalExpandedFormula(ef, x)).toEqual(out)
  })
  test("formula simplification", () => {
    /* nothing yet */
    const fs = [hp, atk, def, dmg_, crcd, crcd0, em, er, ohc, prod(atk, dmg_, crcd, em)]
    const fixed = { 'hp': { min: 13471, max: 13471 }, 'atk_': { min: 0, max: 0 } }
    const ef = expandFormulas(fs)
    const ef2 = simplifyExpandedFormula(ef, fixed)

    const compute = precompute(fs, {}, f => f.path[1], 1)
    const out = compute([{ id: '', values: x }])
    expect(evalExpandedFormula(ef2, x)).toEqual(out)
  })
  test("wacky formula simplification", () => {
    /* nothing yet */
    const fs = [sum(prod(atk, atk, atk, def, dmg_, crcd0, crcd), prod(atk, hp, hp, er, sum(crcd, ohc)))]
    const fixed = {
      'hp': { min: 13471, max: 13471 },
      'atk_': { min: 0, max: 0 },
      'atk': { min: 842, max: 842 }
    }
    const ef = expandFormulas(fs)
    const ef2 = simplifyExpandedFormula(ef, fixed)

    const compute = precompute(fs, {}, f => f.path[1], 1)
    const out = compute([{ id: '', values: x }])
    expect(evalExpandedFormula(ef2, x)[0]).toBeCloseTo(out[0])
  })
})
