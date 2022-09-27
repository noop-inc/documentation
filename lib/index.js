import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'

class Documentation {
  static pages = [
    'GettingStarted',
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
    'Local',
    'Manifests',
    'Logic',
    'Workflows',
    'Runbooks',
    'Test'
  ]

  static async load (file) {
    const filePath = fileURLToPath(new URL(`../docs/${file}.md`, import.meta.url))
    const fileContent = (await readFile(filePath)).toString()
    const page = new Page(file, fileContent)
    await page.load()
    return page
  }

  version

  async load () {
    const [pages, version] = await Promise.all([
      Promise.all(Documentation.pages.map(page =>
        this.constructor.load(page)
      )),
      this.#getVersion()
    ])
    this.pages = pages
    this.version = version
    return this
  }

  async #getVersion () {
    const filePath = fileURLToPath(new URL('../package.json', import.meta.url))
    const fileContent = (await readFile(filePath)).toString()
    return JSON.parse(fileContent).version
  }
}

class Page {
  key
  title
  body
  sections = []
  #raw
  #entries

  constructor (key, raw) {
    this.key = key
    this.#raw = raw
  }

  async load () {
    this.#entries = marked.lexer(this.#raw)

    const bodyBuffer = []
    const sectionBuffer = []

    const processSection = () => {
      if (sectionBuffer.length) {
        this.sections.push(new Section(this, sectionBuffer.splice(0, sectionBuffer.length)))
      }
    }

    this.#entries.forEach(entry => {
      if ((entry.type === 'heading') && (entry.depth <= 2)) {
        if (entry.depth === 1) {
          if (!this.title) this.title = entry.text
        }
        if (entry.depth === 2) {
          processSection()
          sectionBuffer.push(entry)
        }
      } else {
        if (sectionBuffer.length) {
          sectionBuffer.push(entry)
        } else {
          bodyBuffer.push(entry)
        }
      }
    })
    processSection()
    this.body = bodyBuffer.map(({ raw }) => raw).join('')
    await Promise.all(this.sections.map(section => section.load()))
    return this
  }
}

class Section {
  key
  title
  body
  subSections = []
  #entries
  #parent

  constructor (parent, [header, ...entries]) {
    this.#parent = parent
    this.#entries = entries

    const key = header.text.replace(/\W/g, '')
    const prior = this.#parent?.subSections || this.#parent?.sections || []
    const existing = prior.filter(section => section.title.replace(/\W/g, '') === key)

    this.title = header.text
    this.key = `${key}${existing.length ? (existing.length + 1) : ''}`
  }

  async load () {
    const bodyBuffer = []
    const subSectionBuffer = []

    const processSubSection = () => {
      if (subSectionBuffer.length) {
        this.subSections.push(new this.constructor(this, subSectionBuffer.splice(0, subSectionBuffer.length)))
      }
    }

    this.#entries.forEach(entry => {
      if ((entry.type === 'heading') && (entry.depth === 3)) {
        processSubSection()
        subSectionBuffer.push(entry)
      } else {
        if (subSectionBuffer.length) {
          subSectionBuffer.push(entry)
        } else {
          bodyBuffer.push(entry)
        }
      }
    })
    processSubSection()
    this.body = bodyBuffer.map(({ raw }) => raw).join('')
    await Promise.all(this.subSections.map(section => section.load()))
    return this
  }

  get parent () {
    return this.#parent
  }
}

const docs = await (new Documentation()).load()
export default docs
