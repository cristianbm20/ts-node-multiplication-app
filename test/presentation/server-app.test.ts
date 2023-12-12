import { CreateTable } from '../../src/domain/use-cases/create-table.use-case'
import { ServerApp } from '../../src/presentation/server-app'
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case'

describe('Test in server-app.ts', () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: true,
    destination: 'test-destination',
    fileName: 'test-file.txt'
  }

  test('Should create ServerApp instance & method run should be a function', () => {
    const serverApp = new ServerApp()

    expect(serverApp).toBeInstanceOf(ServerApp)
    expect(typeof ServerApp.run).toBe('function')
  })

  test('Should run ServerApp with options', () => {
    const logSpy = jest.spyOn(console, 'log')
    const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute')
    const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute')

    ServerApp.run(options)

    expect(logSpy).toHaveBeenCalledTimes(3)
    expect(logSpy).toHaveBeenCalledWith('ServerApp running...')
    expect(logSpy).toHaveBeenLastCalledWith('File created successfully!')

    expect(createTableSpy).toHaveBeenCalledTimes(1)
    expect(createTableSpy).toHaveBeenCalledWith({ base: options.base, limit: options.limit })

    expect(saveFileSpy).toHaveBeenCalledTimes(1)
    expect(saveFileSpy).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      destination: options.destination,
      fileName: options.fileName
    })
  })

  test('Should run ServerApp with custom values mocked', () => {
    const logMock = jest.fn()
    const logErrorMock = jest.fn()
    const createMock = jest.fn().mockReturnValue('test-fileContent')
    const saveFileMock = jest.fn().mockReturnValue(true)

    console.log = logMock
    console.error = logErrorMock
    CreateTable.prototype.execute = createMock
    SaveFile.prototype.execute = saveFileMock

    ServerApp.run(options)

    expect(logMock).toHaveBeenCalledWith('ServerApp running...')
    expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit })
    expect(saveFileMock).toHaveBeenCalledWith(
      {
        fileContent: 'test-fileContent',
        destination: options.destination,
        fileName: options.fileName
      }
    )
    expect(logMock).toHaveBeenCalledWith('File created successfully!')
    // expect(logErrorMock).toHaveBeenCalledTimes(0)
    expect(logErrorMock).not.toHaveBeenCalled()
  })
})
