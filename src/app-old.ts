// import { argv } from 'process'
import fs from 'node:fs'
import { yarg } from '../src/config/plugins/args.plugin'

// const num = Number(argv[2])
const num = yarg.b
const limit = yarg.l
const table: number[] = []
for (let i = 1; i <= limit; i++) {
  table.push(i)
}
const outputDir = 'outputs'
fs.mkdirSync(outputDir, { recursive: true })

fs.writeFileSync(`${outputDir}/tabla-del-${num}.txt`,
`===============
  Tabla del ${num}
===============

${table.map(item => `${num} x ${item} = ${item * num}`).join('\n')}
`
// ${tablaMult.map(item => `${num} x ${item} = ${item * num}`).join('\n')}
)

if (yarg.s) {
  const output = fs.readFileSync(`${outputDir}/tabla-del-${num}.txt`, 'utf-8')
  console.log(output)
}
