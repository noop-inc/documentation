import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'
import { pages } from '../../index.js'

const getFilePath = file => (
  fileURLToPath(new URL(`../../${file}`, import.meta.url))
)

const getFileContent = async file => (
  (await readFile(getFilePath(`pages/${file}.md`))).toString()
)

const mdToHtml = async page => {
  const file = page.replaceAll(' ', '')
  const markdown = await getFileContent(file)
  const html = marked.parse(markdown)

  return { page, html }
}

const documentation = await Promise.all(pages.map(page => mdToHtml(page)))
const json = JSON.stringify(documentation)

await writeFile(getFilePath('dist.json'), json)
