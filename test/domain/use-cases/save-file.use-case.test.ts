import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case'
import fs from 'node:fs'

describe('Test in save-file.use-case.ts', () => {
  beforeEach(() => {
    fs.rmSync('outputs', { recursive: true, force: true })
    fs.rmSync('custom-outputs', { recursive: true, force: true })
  })

  afterEach(() => {
    fs.rmSync('outputs', { recursive: true, force: true })
    fs.rmSync('custom-outputs', { recursive: true, force: true })
  })

  test('Should save file with default values', () => {
    const options = { fileContent: 'test content' }
    const saveFile = new SaveFile()
    const filePath = 'outputs/table.txt'

    const result = saveFile.execute(options)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    expect(result).toBe(true)
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })

  test('Should save file with custom values', () => {
    const options = { fileContent: 'custom content', destination: 'custom-outputs', fileName: 'custom-table' }
    const saveFile = new SaveFile()
    const filePath = `${options.destination}/${options.fileName}.txt`

    const result = saveFile.execute(options)
    const fileExists = fs.existsSync(filePath)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    expect(result).toBe(true)
    expect(fileExists).toBe(true)
    expect(fileContent).toBe(options.fileContent)
  })
})
