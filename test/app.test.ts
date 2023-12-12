import { ServerApp } from '../src/presentation/server-app'

describe('Test in app.ts', () => {
  it('Should call Server.run with values', async () => {
    const serverRunMock = jest.fn()
    ServerApp.run = serverRunMock
    process.argv = ['node', 'app', '-b', '5', '-l', '10', '-s', '-d', 'test-outputs', '-n', 'test-table']

    await import('../src/app')

    expect(serverRunMock).toHaveBeenCalledWith(
      {
        base: 5,
        limit: 10,
        showTable: true,
        destination: 'test-outputs',
        fileName: 'test-table'
      }
    )
  })
})
