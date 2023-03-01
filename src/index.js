import { outro, intro, text, select } from '@clack/prompts'
import color from 'picocolors'

const statics = {
  global1: 1000,
  global2: 0.0003069
}

intro(color.inverse('Bienvenido al software de distrito de energia'))
intro(color.yellow('Por favor siga las siguientes instrucciones: '))

const caudal = await text({
  message: color.cyan('Ingrese el caudal en m3/h'),
  placeholder: 'Solo se permiten numeros',
  validate (value) {
    if (value === 0) return color.yellow('Ingrese un valor al caudal en m3/h')
    if (isNaN(value)) return color.yellow('Solo se permite ingresar numeros')
  }
})

const tempEntrada = await text({
  message: color.cyan('Ingrese la temperatura de entrada en °C'),
  placeholder: 'Solo se permiten numeros',
  validate (value) {
    if (value === 0) return color.yellow('Ingrese un valor a la temperatura de entrada en °C')
    if (isNaN(value)) return color.yellow('Solo se permite ingresar numeros')
  }
})

const tempSalida = await text({
  message: color.cyan('Ingrese la temperatura de salida °C'),
  placeholder: 'Solo se permiten numeros',
  validate (value) {
    if (value === 0) return color.yellow('Ingrese un valor a la temperatura de salida en °C')
    if (isNaN(value)) return color.yellow('Solo se permite ingresar numeros')
  }
})

const servicio = await text({
  message: color.cyan('Ingrese un valor al factor de servicio'),
  placeholder: 'El valor debe estar entre 1 y 3',
  validate (value) {
    if (value < 1 || value > 3) return color.yellow('El valor debe ser mayor a 1 y menor a 3')
    if (isNaN(value)) return color.yellow('Solo se permite ingresar numeros')
  }
})

const chillerCentrifugo = await select({
  message: color.cyan('Selecciona una opcion para el Chiller Centrifugo '),
  options: [
    { value: 500, label: '500' },
    { value: 750, label: '750' },
    { value: 1000, label: '1000' }
  ]
})

const chillerCentrifugoCantidad = await text({
  message: color.cyan('Ingrese la cantidad para el Chiller Centrifugo'),
  placeholder: 'Solo se permiten numeros enteros',
  validate (value) {
    if (!(value % 2 === 0)) return color.yellow('Solo se permiten numeros enteros')
  }
})

const total = caudal * (tempEntrada - tempSalida) * servicio * statics.global1 * statics.global2

console.log('el total es ' + Math.floor(total))
console.log(chillerCentrifugo)
console.log(chillerCentrifugoCantidad)
console.log(chillerCentrifugo * chillerCentrifugoCantidad)

outro(color.inverse('Gracias por usar el software'))
