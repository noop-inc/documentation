---
layout: '../../layouts/Doc.astro'
title: Builds
slug: builds
description: ''
section: core concepts
order: 3
---

Builds are the processes that create a Component's Deployment artifact. They are defined in the Noop Blueprint (blueprint.yaml) for each Application Component.

Each step in the Build process creates a container image, the image from the final step becomes the Service or Task runtime or defines the directory for a Static (the artifact in this case is a collection of static files).

Here's an example Build for a Static Component:


```yaml
components:
  - name: StaticApp
    type: static
    image: node:20-alpine
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

As you can see there are several steps that culminate in producing a `dist` directory, which includes the static assets for hosting.

## Build Schema

The schema for a build definition is a single required `steps` array property that includes at least one of the following: `run`, `copy`, `image`, `test` or `image`.

- **`steps`** *(array)*: Length must be at least 1.
  - **Items**
    - **One of**
      - *object*: Cannot contain additional properties.
        - **`run`** *(string, required)*
      - *object*: Cannot contain additional properties.
        - **`test`** *(string, required)*
      - *object*: Cannot contain additional properties.
        - **`directory`** *(string, required)*
      - *object*: Cannot contain additional properties.
        - **`copy`**
          - **One of**
            - *string*
            - *array*: Length must be at least 1.
              - **Items** *(string)*
        - **`destination`** *(string)*
        - **`from`** *(string)*
      - *object*: Cannot contain additional properties.
        - **`image`** *(string, required)*
        - **`stage`** *(string)*

## Multi-stage Builds

The image property referenced above makes it possible to configure multi-stage builds. Here's an example that shows constructing a build using multiple images:

```yaml
 - name: WebsiteStatic
   type: service
   image: node:20-alpine
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
        - image: nginx:1-alpine
          stage: nginx
        - copy: dist
          destination: /usr/share/nginx/html/
          from: main
        - copy: nginx.conf
          destination: /etc/nginx
    runtime:
      command: 'nginx -g "daemon off;"'
      variables:
        NGINX_ENTRYPOINT_QUIET_LOGS: '1'
```
