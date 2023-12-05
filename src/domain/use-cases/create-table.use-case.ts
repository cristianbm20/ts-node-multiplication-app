export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string
}

export interface CreateTableOptions {
  base: number
  limit?: number
}

export class CreateTable implements CreateTableUseCase {
  constructor () {}

  execute ({ base, limit = 10 }: CreateTableOptions): string {
    const table: number[] = []
    for (let i = 1; i <= limit; i++) {
      table.push(i)
    }

    return table.map(item => `${base} x ${item} = ${item * base}`).join('\n')
  }
}
