import { marked } from 'marked'
import { readFileSync } from 'fs'
import { join } from 'path'

class Documentation {
  static pages = [
    "Applications",
    "Environments",
    "Builds",
    "Pipelines",
    "Endpoints",
    "Components",
    "Resources",
    "Routing",
    "Deployments",
    "Stacks",
    "Logs",
    "Security",
    "Local",
    "Manifests",
    "Logic",
    "Workflows"
  ]

  constructor () {
    this.intro = new Page('Introduction', readFileSync(join('.', 'README.md')).toString())
    this.pages = Documentation.pages.map(pageKey => {
      const markdown = readFileSync(join('.', 'pages', `${pageKey}.md`))
      return new Page(pageKey, markdown.toString())
    })
  }
}

class Page {
  key
  title
  body
  sections
  #raw
  #entries

  constructor (key, markdown) {
    this.key = key
    this.#raw = markdown
    this.#entries = marked.lexer(markdown)
    this.sections = []
    const bodyBuffer = []
    const sectionBuffer = []
    for (const entry of this.#entries) {
      if (entry.type === 'heading' && entry.depth <= 2) {
        if (entry.depth === 1) {
          if (!this.title) this.title = entry.text
        } else if (entry.depth === 2) {
          if (sectionBuffer.length) {
            this.sections.push(new Section(this, sectionBuffer.splice(0, sectionBuffer.length)))
          } else {
            sectionBuffer.push(entry)
          }
        }
      } else {
        if (sectionBuffer.length) {
          sectionBuffer.push(entry)
        } else {
          bodyBuffer.push(entry.raw)
        }
      }
    }
    this.body = bodyBuffer.join('\n')
    if (sectionBuffer.length) {
      this.sections.push(new Section(this, sectionBuffer.splice(0, sectionBuffer.length)))
    }
  }
}

class Section {
  key
  title
  body
  #entries
  #page

  constructor (page, entries) {
    this.#page = page
    this.#entries = entries
    const bodyBuffer = []
    for (const entry of entries) {
      if (entry.type === 'heading' && entry.depth === 2 && !this.title) {
        this.key = entry.text.replace(/\W/g, '')
        this.title = entry.text
      } else {
        bodyBuffer.push(entry.raw)
      }
    }
    this.body = bodyBuffer.join('\n')
  }
}

const docs = new Documentation()
export default docs