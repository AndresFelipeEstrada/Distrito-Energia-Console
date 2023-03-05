import { fileURLToPath } from 'url'
import { dirname } from 'path'
import exceljs from 'exceljs'

import { table } from 'table'

export const logicTable = ({ caudal, tempEntrada, tempSalida, servicio, chillerCentrifugo, chillerCentrifugoCantidad, chillerAbsorcion, chillerAbsorcionCantidad }) => {
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

  const exportData = async () => {
    const nuevaArchivo = new exceljs.Workbook() // crea nuevo archivo de excel
    const nuevaHoja = nuevaArchivo.addWorksheet('distritos-termicos') // crea nueva hoja dentro del archivo excel

    const __dirname = dirname(fileURLToPath(import.meta.url))
    const ruta = `${__dirname}/excel` // Ruta donde descargar el archivo excel

    // Looping through User data

    dataCentrifugo.forEach((data) => {
      nuevaHoja.addRow(data) // Add data in worksheet
    })

    dataAbsorcion.forEach((data) => {
      nuevaHoja.addRow(data)
    })

    nuevaHoja.getCell('A1').font = {
      bold: true
    }
    nuevaHoja.getCell('B1').font = {
      bold: true
    }
    nuevaHoja.getCell('C1').font = {
      bold: true
    }
    nuevaHoja.getCell('D1').font = {
      bold: true
    }

    try {
      const data = await nuevaArchivo.xlsx.writeFile(`${ruta}/tabla.xlsx`)
        .then(() => {
          console.log('excel creado con exito')
        })
    } catch (error) {
      console.log(error)
    }
  }

  exportData()
}
