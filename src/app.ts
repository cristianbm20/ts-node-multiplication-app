import { ServerApp } from './presentation/server-app'
import { yarg } from './config/plugins/args.plugin'

// console.log(yarg.b)

const main = async (): Promise<void> => {
  const { b: base, l: limit, s: showTable, d: destination, n: fileName } = yarg
  ServerApp.run({ base, limit, showTable, destination, fileName })
}

// Funcion autoinvocada
(async () => {
  try {
    await main()
  } catch (error) {
    console.error('Error al ejecutar main: ', error)
  }
})().catch(error => console.error('Error inesperado:', error))
