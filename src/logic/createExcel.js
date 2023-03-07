import { fileURLToPath } from 'url'
import { dirname } from 'path'
import exceljs from 'exceljs'
import color from 'picocolors'

import editExcel from './editExcel.js'

const createExcel = async ({ dataCentrifugo, dataAbsorcion }) => {
  const nuevaArchivo = new exceljs.Workbook() // crea nuevo archivo de excel
  const nuevaHoja = nuevaArchivo.addWorksheet('distritos-termicos') // crea nueva hoja dentro del archivo excel

  const __dirname = dirname(fileURLToPath(import.meta.url))
  const ruta = `${__dirname}/excel` // Ruta donde descargar el archivo excel

  dataCentrifugo.forEach((data) => {
    nuevaHoja.addRow(data) // Agregar data tabla centrifugo
  })

  nuevaHoja.addRow(' ')

  dataAbsorcion.forEach((data) => {
    nuevaHoja.addRow(data) // Agregar data tabla absorcion
  })

  editExcel({ nuevaHoja })

  const today = new Date()
  const yyyy = today.getFullYear()
  const mm = today.getMonth() + 1
  const dd = today.getDate()
  const hour = today.getHours()
  const minutes = today.getMinutes()

  try {
    await nuevaArchivo.xlsx.writeFile(`${ruta}/${dd}-${mm}-${yyyy}-${hour}-${minutes}.xlsx`)
      .then(() => {
        console.log(' ')
        console.log(color.yellow('---excel creado con exito---'))
        console.log(' ')
      })
  } catch (error) {
    console.log(color.red(error))
  }
}

export default createExcel
