import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { marked } from 'marked'

class Documentation {
  static pages = [
    'GettingStarted',
    'QuickStart',
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

  version

  // load documentation content
  async load () {
    const [version, ...pages] = await Promise.all([
      this.#getVersion(),
      ...Documentation.pages.map((file, index) =>
        this.#getPage(file, index)
      )
    ])
    this.version = version
    this.pages = pages
    await Promise.all(this.pages.map(page => page.load()))
    return this
  }

  // get version number of documentation from package.json
  async #getVersion () {
    const fileContent = await this.#getFileContent('../package.json')
    return JSON.parse(fileContent).version
  }

  // create page instances
  async #getPage (file, index) {
    const fileContent = await this.#getFileContent(`../docs/${file}.md`)
    const entries = marked.lexer(fileContent)
    return new Page(this, file, index, entries)
  }

  // retrieve raw text content from files
  async #getFileContent (path) {
    const filePath = fileURLToPath(new URL(path, import.meta.url))
    return (await readFile(filePath)).toString()
  }
}

class Page {
  pageKey
  titleKey
  title
  body
  sections = []
  #documentation
  #file
  #index
  #entries

  constructor (documentation, file, index, [header, ...entries]) {
    this.#documentation = documentation
    this.#file = file
    this.#index = index
    this.#entries = entries
    this.title = header.text
  }

  async load () {
    // assigns unique key value for page
    if (!this.rawPageKey) {
      this.pageKey = `-${this.#index + 1}`
    } else {
      const prior = this.#documentation.pages.slice(0, this.#index)
      const existing = prior.filter(({ rawPageKey }) => rawPageKey === this.rawPageKey)
      const ending = existing.length ? `-${existing.length}` : ''
      this.pageKey = `${this.rawPageKey}${ending}`
    }

    // process page content
    const bodyBuffer = []
    const sectionBuffer = []

    const processSection = () => {
      if (sectionBuffer.length) {
        this.sections.push(new Section(this, sectionBuffer.splice(0, sectionBuffer.length)))
      }
    }

    for (const entry of this.#entries) {
      if ((entry.type === 'heading') && (entry.depth === 2)) {
        processSection()
        sectionBuffer.push(entry)
      } else {
        if (sectionBuffer.length) {
          sectionBuffer.push(entry)
        } else {
          bodyBuffer.push(entry)
        }
      }
    }
    processSection()

    // concats raw body content for page
    this.body = bodyBuffer.map(({ raw }) => raw).join('')

    // load all sections existing under this page
    await Promise.all(this.sections.map(section => section.load()))

    this.titleKey = this.rawTitleKey || '-'

    return this
  }

  // generates the raw un-deduped key value for page
  get rawPageKey () {
    return this.#file
      .replace(/[^a-zA-Z0-9]+/g, '')
      .trim()
  }

  // generates the raw un-deduped key value for title
  get rawTitleKey () {
    return this.title
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase()
  }
}

class Section {
  titleKey
  title
  body
  subsections = []
  #entries
  #parent

  constructor (parent, [header, ...entries]) {
    this.#parent = parent
    this.#entries = entries
    this.title = header.text

    // assigns unique key value for section
  }

  async load () {
    // procee section content
    const bodyBuffer = []
    const subsectionBuffer = []

    const processSubSection = () => {
      if (subsectionBuffer.length) {
        this.subsections.push(new this.constructor(this, subsectionBuffer.splice(0, subsectionBuffer.length)))
      }
    }

    for (const entry of this.#entries) {
      if ((entry.type === 'heading') && (entry.depth === 3)) {
        processSubSection()
        subsectionBuffer.push(entry)
      } else {
        if (subsectionBuffer.length) {
          subsectionBuffer.push(entry)
        } else {
          bodyBuffer.push(entry)
        }
      }
    }
    processSubSection()

    // concats raw body content for section
    this.body = bodyBuffer.map(({ raw }) => raw).join('')

    // load all subsections existing under this section
    await Promise.all(this.subsections.map(section => section.load()))

    const all = [
      this.page,
      ...this.page.sections
        .map(section => [section, ...section.subsections])
        .flat()
    ]
    const index = all.findIndex(section => section === this)
    const prior = all.slice(0, index).map(({ rawTitleKey }) => rawTitleKey)
    const existing = prior.filter(rawTitleKey => rawTitleKey === this.rawTitleKey)
    const ending = existing.length ? `-${existing.length}` : ''

    this.titleKey = `${this.rawTitleKey}${ending}` || '-'

    return this
  }

  // generates the raw un-deduped key value for section
  get rawTitleKey () {
    return this.title
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase()
  }

  get parent () {
    return this.#parent
  }

  get page () {
    return this.#parent.page || this.#parent
  }

  get section () {
    return this.#parent.page ? this.#parent : null
  }
}

const docs = await (new Documentation()).load()
export default docs
