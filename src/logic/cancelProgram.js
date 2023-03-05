import { outro } from '@clack/prompts'
import color from 'picocolors'

export function exitProgram () {
  outro(color.italic(color.yellow('GRACIAS POR USAR EL SOFTWARE!!!')))
  process.exit(0)
}
