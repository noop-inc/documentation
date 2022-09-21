# Noop Documentation

Central Repository of Noop Documentation

## Getting Started

Jump in to the documentation now with [Getting Started](docs/GettingStarted.md)

## Contributing

This repository contains the authoratative content of Noop documenation. This content is authored in an intentionally minimalistic Markdown format so it can be rendered within a variety of clients. Our parser enforces two key concepts to the Markdown, particularly on the use of headers.

- Each Markdown file in the `./docs/` directory is a **Page**. The title of the page is read from the first h1 block, like `# Page Title`. If there are other h1 blocks, they are disregared.
- Each **Page** contains zero or more **Sections** which are demarcated by h2 blocks, like `## Section Title`. All the Markdown content that follows up until another h2 is included in the section body.
