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
  #file
  title
  body
  sections = []
  #raw
  #entries

  constructor (file, raw) {
    this.#file = file
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

  get key () {
    return (
      this.#file
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase() ||
      'page'
    )
  }

  toJSON () {
    return {
      key: this.key,
      ...this
    }
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
    this.title = header.text

    const prior = [
      this.page.key,
      ...this.page.sections
        .map(section => [section, ...section.subSections])
        .flat()
        .map(section => section.rawKey)
    ]

    const existing = prior
      .filter(key => key === this.rawKey)

    this.key = `${
      this.rawKey
    }${
      (existing.length || ['page', 'section', 'subsection'].includes(this.rawKey))
        ? (`_${existing.length + 1}`)
        : ''
    }`
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

  get rawKey () {
    return (
      // The resulting raw keyvalue might be shared with another
      // section/subsection within this page. The value will be
      // iterated to de-duplicate within the Section's constructor
      this.title
        .replace(/[^a-zA-Z0-9]+/g, ' ')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase() ||
      (
        // if there is a parent section that is using a non-default raw key value
        (this.section?.rawKey && this.section.rawKey !== 'section')
          // use the parent raw key value
          ? this.section.rawKey
          // otherwise check if the parent page has a non-default raw key value
          : (this.page?.key && this.page.key !== 'page')
              // use the parent raw key value
              ? this.page.key
              // fallback to default value for section raw key value
              : this.section
                ? 'subsection'
                : 'section'
      )
    )
  }

  get parent () {
    return this.#parent
  }

  get page () {
    return this.parent.parent || this.parent
  }

  get section () {
    return this.parent.parent ? this.parent : null
  }
}

const docs = await (new Documentation()).load()
export default docs
