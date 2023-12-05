import { CreateTable } from '../../../src/domain/use-cases/create-table.use-case'

describe('Test in create-table.use-case.ts', () => {
  test('Should create table with default values', () => {
    const createTable = new CreateTable()
    const table = createTable.execute({ base: 2 })
    const rows = table.split('\n').length

    expect(createTable).toBeInstanceOf(CreateTable)
    expect(table).toContain('2 x 1 = 2')
    expect(table).toContain('2 x 10 = 20')
    expect(rows).toBe(10)
  })

  test('Should create table with custom values', () => {
    const options = { base: 3, limit: 20 }
    const createTable = new CreateTable()
    const table = createTable.execute(options)

    expect(table).toStrictEqual(
      `3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
3 x 4 = 12
3 x 5 = 15
3 x 6 = 18
3 x 7 = 21
3 x 8 = 24
3 x 9 = 27
3 x 10 = 30
3 x 11 = 33
3 x 12 = 36
3 x 13 = 39
3 x 14 = 42
3 x 15 = 45
3 x 16 = 48
3 x 17 = 51
3 x 18 = 54
3 x 19 = 57
3 x 20 = 60`
    )
  })
})
