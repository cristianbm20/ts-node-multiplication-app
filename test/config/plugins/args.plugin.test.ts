// import { yarg } from '../../src/config/plugins/args.plugin'

const runCommand = async (args: string[]): Promise<{}> => {
  process.argv = [...process.argv, ...args]

  const { yarg } = await import('../../../src/config/plugins/args.plugin')

  return yarg
}

describe('Test in args.plugin.ts', () => {
  const originalArgv = process.argv

  beforeEach(() => {
    process.argv = originalArgv
    jest.resetModules()
  })

  test('Should return default values', async () => {
    const argv = await runCommand(['-b', '5'])

    expect(argv).toEqual(expect.objectContaining({
      b: 5,
      l: 10,
      s: false,
      d: 'outputs',
      n: 'table'
    }))
  })

  test('Should return configuration with custom values', async () => {
    const argv = await runCommand(['-b', '3', '-l', '20', '-s', '-d', 'custom-outputs', '-n', 'custom-table'])

    expect(argv).toEqual(expect.objectContaining({
      b: 3,
      l: 20,
      s: true,
      d: 'custom-outputs',
      n: 'custom-table'
    }))
  })
})
