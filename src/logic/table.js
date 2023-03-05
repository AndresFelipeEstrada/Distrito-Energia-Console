import { confirm } from '@clack/prompts'
import { table } from 'table'
import color from 'picocolors'

import createExcel from './createExcel.js'

export const logicTable = async ({ caudal, tempEntrada, tempSalida }) => {
  const dataCentrifugo = [

    ['Energia', 'Emisiones', 'Capex', 'Opex'],
    ['Red publica', caudal, '0C', '00'],
    ['Microturbina gas', tempEntrada, '0C', '00'],
    ['Solar fotovoltaica', tempSalida, '0C', '00'],
    ['Energia eolica', '0B', '0C', '00'],
    ['Energia biomasa', '0B', '0C', '00'],
    ['Chiller centrifugo', '0B', '0C', '00']

  ]

  const dataAbsorcion = [
    ['Energia', 'Emisiones', 'Capex', 'Opex'],
    ['Microturbina gas', '0C', '0C', '00'],
    ['Solar termica', '0C', '0C', '00'],
    ['Energia biomasa', '0C', '0C', '00'],
    ['Chiller absorcion', '0B', '0C', '00']

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
