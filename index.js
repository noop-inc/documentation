import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import { marked } from 'marked'

const getFilePath = file => (
  fileURLToPath(new URL(`./pages/${file}.md`, import.meta.url))
)

const getFileContent = async file => (
  (await readFile(getFilePath(file))).toString()
)

const mdToHtml = async page => {
  const file = page.replaceAll(' ', '')
  const markdown = await getFileContent(file)
  const html = marked.parse(markdown)

  return { page, html }
}

const pages = [
  'Getting Started',
  'Applications',
  'Environments',
  'Builds',
  'Pipelines',
  'Endpoints',
  'Components',
  'Resources',
  'Routing',
  'Deployments',
  'Stacks',
  'Logs',
  'Security',
  'Local Development',
  'Manifests',
  'Logic',
  'Workflows'
]

export default await Promise.all(pages.map(page => mdToHtml(page)))
