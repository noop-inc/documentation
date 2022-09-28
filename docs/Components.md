# Components

The [Noop Application Model]() supports several Components you can define for how we build and run your code. You can mix and match multiple Components to meet your evolving needs. Want to add a new microservice to your architecture, easy just define a new Service. Need to run a cron job nightly, just define a Task. Developing the next version of your API in a new framework, it can be defined alongside the current version with Routes to specific which version handles which requests.

## Services

Service Components run your code in horizontally-scalable containers and often handle HTTP Traffic.

```yaml
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

Static Components build web assets from your code for easy hosting along with the rest of your NoopApp.

```yaml
components:
  - name: Website
      type: task
      image: hugo
      build:
        steps:
          - directory: /website
          - copy: .
          - run: hugo build
      assets: dist/
      index: index.html
      singlePage: true
```
