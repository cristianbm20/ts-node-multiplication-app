import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

export const yarg = yargs(hideBin(process.argv))
  .option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Multiplication table base'
  })
  .option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Multiplication table limit'
  })
  .option('s', {
    alias: 'showTable',
    type: 'boolean',
    default: false,
    describe: 'Show multiplication table'
  })
  .option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'File destination'
  })
  .options('n', {
    alias: 'filename',
    type: 'string',
    default: 'table',
    describe: 'File name'
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw new Error('The base must be a number')
    }
    if (argv.b < 1) {
      throw new Error('The base must be greater than 0')
    }
    if (isNaN(argv.l)) {
      throw new Error('The limit must be a number')
    }
    return true
  })
  .parseSync()
