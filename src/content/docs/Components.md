# Components

The [Noop Application Model](/docs/Applications.md#noop-application-model) supports several Components you can define for how we build and run your code. You can mix and match multiple Components to meet your evolving needs. Want to add a new microservice to your architecture, easy just define a new Service. Need to run a cron job nightly, just define a Task. Developing the next version of your API in a new framework, it can be defined alongside the current version with Routes to specific which version handles which requests.

## Services

Service Components run your code in horizontally-scalable containers and often handle HTTP Traffic.

```yaml
# Simple example
components:
  - name: Webserver
    type: service
    image: nginx
```

```yaml
# All available options
components:
  - name: Api
    type: service
    image: nodejs:alpine
    port: 8080 # default 80
    health:
      checker: tcp # default tcp
      interval: 10
      retries: 5
      port: 80
    build:
      steps:
        - directory: /server
        - copy: package*.json
        - run: npm ci --ignore-scripts
    runtime:
      resources:
        - Customers
      command: npm start
      cpu: 1
      memory: 512
      variables:
        LOG_LEVEL: info
        DYNAMO_TABLE:
          $resources: Customers.tableName
        DYNAMO_ENDPOINT:
          $resources: Customers.endpoint
```

## Tasks

Task Components run your code in singleton containers and are often used for administrative jobs. Tasks can be invoked through [Workflows](), [Lifecycles](), or just manually on demand.

```yaml
components:
  - name: CronJob
      type: task
      image: nodejs:alpine
      root: cron_task/
      cron: '*/5 * * * *'
      build:
        steps:
          - directory: /cron
          - copy: package*.json
          - run: npm ci --ignore-scripts
      runtime:
        command: node cron_task.js
        entrypoint: /bin/bash
        resources:
          - Customers
        variables:
          LOG_LEVEL: info
          DYNAMO_TABLE:
            $resources: Customers.tableName
          DYNAMO_ENDPOINT:
            $resources: Customers.endpoint
```

## Statics

Static Components build and host web assets from generated from your Source Code.
You can use Statics for hosting specific assets or SPA (Single Page App) web applications.

```yaml
components:
  - name: Website
    type: static
    image: node:alpine
    hosting:
      index: index.html
      spa: true
    build:
      steps:
        - directory: /site
        - copy: .
        - run: npm ci
        - run: npm run build
        - directory: dist/
```

At the end of building your Static Component, Noop will extract all the files and subdirectories in the current working directory.
Notice how in the example above, the Build starts in the `/site` directory,
runs the compilation commands, and then moves into the `dist/` subdirectory where the assets were saved.
The resulting Static will host all the files from the `/site/dist` directory.
