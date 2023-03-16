import { confirm } from '@clack/prompts'
import { table } from 'table'
import color from 'picocolors'

import createExcel from './createExcel.js'

export const logicTable = async ({ parametro1, parametro2 }) => {
  // Formulas Centrifugo
  const rp = Math.floor(parametro1 * 0.3190995427365)
  const gas = Math.floor((parametro1 * 511.13199046407) / 1000)
  const gCapex = Math.floor((parametro1 * 0.0035174111853) * (1925000 / 0.88))
  const gOpex = Math.floor(gCapex * 0.03)

  const solarCapex = Math.floor(parametro1 * 0.0035174111853)
  const ft = Math.floor(solarCapex * 1000000)
  const eCapex = Math.floor(solarCapex * 1700000)
  const bCapex = Math.floor(solarCapex * 2000000)

  // Tabla Centrifugo
  const dataCentrifugo = [
    ['Energia', 'Emisiones', 'Capex', 'Opex'],
    ['Red publica', rp, '00', '00'],
    ['Microturbina gas', gas, gCapex, gOpex],
    ['Solar fotovoltaica', ft, solarCapex, '00'],
    ['Energia eolica', '00', eCapex, '00'],
    ['Energia biomasa', '00', bCapex, '00'],
    ['Chiller centrifugo', parametro1, '00', '00']
  ]

  // Formulas Absorcion
  const gasAbsorcion = Math.floor((parametro2 * 511.13199046407) / 1000)
  const gasCapexAbsorcion = Math.floor(((parametro2 * 0.0035174111853) * (1925000 / 0.88)))
  const gasOpexAbsorcion = Math.floor(gasCapexAbsorcion * 0.03)

  const solarCapexAbsorcion = Math.floor(parametro2 * 0.0035174111853)
  const ftAbsorcion = (solarCapexAbsorcion * 1000000) * 1.015
  const bioAbsorcion = Math.floor(solarCapexAbsorcion * 2000000)

  // Tabla Absorcion
  const dataAbsorcion = [
    ['Energia', 'Emisiones', 'Capex', 'Opex'],
    ['Microturbina gas', gasAbsorcion, gasCapexAbsorcion, gasOpexAbsorcion],
    ['Solar termica', '00', solarCapexAbsorcion, '00'],
    ['Energia biomasa', '00', bioAbsorcion, '00'],
    ['Chiller absorcion', parametro2, '00', '00']
  ]

  console.log('Tabla Centrifuga: ')
  console.log(table(dataCentrifugo))
  console.log('##########################################')
  console.log('Tabla Absorcion: ')
  console.log(table(dataAbsorcion))

  const crearExcel = await confirm({
    message: color.cyan('Desea crear un informe Excel? '),
    initialValue: false
  })

  if (crearExcel === true) {
    return await createExcel({ dataCentrifugo, dataAbsorcion })
  }
}
