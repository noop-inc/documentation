---
title: 'Statics'
description: 'Hosting static websites and single page apps on Noop'
slug: 'statics'
section: 'components'
layout: '../../layouts/Doc.astro'
pubDate: ''
order: 13
---

Static Components are for hosting static websites and assets. A Static Component can be configured to serve single page applications (SPAs), or a directory (folder) of files.

Statics are a good choice for hosting static sites and SPAs. Noop supports all major languages and frameworks including:

- ReactJS

- VueJS

- Svelte

- NextJS

- Hugo

- 11ty

- Astro

# **Service Configuration**

Static Components are defined in the Application Manifest (app.yml). Statics require an alphanumeric `name`, a `type` of `static` and an `image` for executing the asset build process.

```
components:
  - name: StaticApp
    type: static
    image: node:18-alpine
    hosting:
      spa: true
    build:
      steps:
        - copy: package*.json
          destination: ./
        - run: npm ci
        - copy: index.html
        - copy: vite.config.js
        - copy: public/
        - copy: src/
        - run: npm run build
        - directory: dist/
```

The build phase is optional, however it’s usually necessary to generate assets for deployment and specify exactly what files should be hosted.

The final working directory in the build.steps property is the content that will be served. In the example above that’s the `dist/` directory.

## **Configuration Reference**

Service Components are defined in your .noop/app.yml as an array under the components property.

- The `name` property is an alpha-numeric string and is required

- The `type` property is required and must be set to `static`

- The `image` property is the name of the container image. Noop supports Docker Hub images. The image property is required.

- The `build` property describes an array of steps to follow while building the service

- The `hosting` property is an object that includes two properties

  - `spa`, which determines if unfound html assets should fall back to the default index file

  - `index`, which is the name of the file to use as the default index file (default is `index.html`)

- The root property is an optional configuration to specify the folder within the source repository to use for the component.
