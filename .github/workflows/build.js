import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import documentation from '../../index.js'

const getFilePath = path => (
  fileURLToPath(new URL(`../../${path}`, import.meta.url))
)

const distPath = getFilePath('dist')
const jsonPath = getFilePath('dist/index.json')

await mkdir(distPath, { recursive: true })
await writeFile(jsonPath, JSON.stringify(documentation))
