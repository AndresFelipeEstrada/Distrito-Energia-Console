import { outro, intro, text, select, confirm, isCancel } from '@clack/prompts'
import color from 'picocolors'

import { statics } from './logic/statics.js'
import { logicTable } from './logic/table.js'
import { exitProgram } from './logic/cancelProgram.js'

let continuar = true

while (continuar) {
  intro(color.italic(color.yellow('BIENVENIDO AL SOFTWARE DE DISTRITO DE ENERGIA')))
  intro(color.yellow('Por favor siga las siguientes instrucciones: '))

  const caudal = await text({
    message: color.cyan('Ingrese el caudal en m3/h'),
    placeholder: 'Solo se permiten numeros',
    validate (value) {
      if (value === '') return color.red('Ingrese un valor')
      if (value === 0) return color.red('Ingrese un valor al caudal en m3/h')
      if (isNaN(value)) return color.red('Solo se permite ingresar numeros')
    }
  })

  if (isCancel(caudal)) exitProgram()

  const tempEntrada = await text({
    message: color.cyan('Ingrese la temperatura de entrada en °C'),
    placeholder: 'Solo se permiten numeros',
    validate (value) {
      if (value === '') return color.red('Ingrese un valor')
      if (value === 0) return color.red('Ingrese un valor a la temperatura de entrada en °C')
      if (isNaN(value)) return color.red('Solo se permite ingresar numeros')
    }
  })

  if (isCancel(tempEntrada)) exitProgram()

  const tempSalida = await text({
    message: color.cyan('Ingrese la temperatura de salida °C'),
    placeholder: 'Solo se permiten numeros',
    validate (value) {
      if (value === '') return color.red('Ingrese un valor')
      if (value === 0) return color.red('Ingrese un valor a la temperatura de salida en °C')
      if (isNaN(value)) return color.red('Solo se permite ingresar numeros')
    }
  })

  if (isCancel(tempSalida)) exitProgram()

  const servicio = await text({
    message: color.cyan('Ingrese un valor al factor de servicio'),
    placeholder: 'El valor debe estar entre 1 y 3',
    validate (value) {
      if (value < 1 || value > 3) return color.red('El valor debe ser mayor a 1 y menor a 3')
      if (isNaN(value)) return color.red('Solo se permite ingresar numeros')
    }
  })

  if (isCancel(servicio)) exitProgram()

  const chillerCentrifugo = await select({
    message: color.cyan('Selecciona una opcion para el Chiller Centrifugo '),
    options: [
      { value: 500, label: '500' },
      { value: 750, label: '750' },
      { value: 1000, label: '1000' }
    ]
  })

  if (isCancel(chillerCentrifugo)) exitProgram()

  const chillerCentrifugoCantidad = await text({
    message: color.cyan('Ingrese la cantidad para el Chiller Centrifugo'),
    placeholder: 'Solo se permiten numeros enteros',
    validate (value) {
      if (value === '') return color.red('Ingrese un valor')
      if (value % 1 !== 0) return color.red('Solo se permiten numeros enteros')
    }
  })

  if (isCancel(chillerCentrifugoCantidad)) exitProgram()

  const chillerAbsorcion = await select({
    message: color.cyan('Selecciona una opcion para el Chiller Centrifugo '),
    options: [
      { value: 500, label: '500' },
      { value: 750, label: '750' },
      { value: 1000, label: '1000' }
    ]
  })

  if (isCancel(chillerAbsorcion)) exitProgram()

  const chillerAbsorcionCantidad = await text({
    message: color.cyan('Ingrese la cantidad para el Chiller Centrifugo'),
    placeholder: 'Solo se permiten numeros enteros',
    validate (value) {
      if (value === '') return color.red('Ingrese un valor')
      if (value % 1 !== 0) return color.red('Solo se permiten numeros enteros')
    }
  })

  if (isCancel(chillerAbsorcionCantidad)) exitProgram()

  const total = caudal * (tempEntrada - tempSalida) * servicio * statics.global1 * statics.global2

  outro(color.green(`El total es: ${Math.floor(total)}`))

  logicTable({ caudal, tempEntrada, tempSalida, servicio, chillerCentrifugo, chillerCentrifugoCantidad, chillerAbsorcion, chillerAbsorcionCantidad })

  continuar = await confirm({
    message: 'Desea ejecutar el programa de nuevo?',
    initialValue: false
  })

  if (isCancel(continuar)) exitProgram()

  if (continuar === false) {
    outro(color.italic(color.yellow('GRACIAS POR USAR EL SOFTWARE!!!')))
  }
}
