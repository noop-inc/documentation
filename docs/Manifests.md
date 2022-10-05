# Manifests

## AppManifest

Expressed in Source Code at `.noop/app.yml`

```yaml
# Sample AppManifest
components:
  - name: ApiService
    type: service
    image: nodejs:alpine
    port: 8080
    health:
      checker: tcp #cmd [command], http [path, port]
      interval: 10
      retries: 5
      port: 80
    build: # $app $source
      steps:
        - directory: /server
        - copy: package*.json
          destination: package*.json
        - run: npm ci --ignore-scripts
    runtime: # $env $app $build
      resources:
        - ItemsDatabase
        - ImagesBucket
      command: npm start
      cpu: 1
      memory: 256
      variables:
        S3_BUCKET:
          $resources: ImagesBucket.bucket
        S3_ENDPOINT:
          $resources: ImagesBucket.endpoint
        MYSQL_URL:
          $resources: ItemsDatabase.url
        LOG_LEVEL: info
  - name: MaintenanceJob
    type: task
    image: nodejs:alpine
    root: cron_task/
    cron: '*/5 * * * *'
    build:
      steps:
        - directory: /cron
        - image: foo
          stage: bar
        - copy: [package-lock.json, package.json]
          destination: /app/src
          from: main
        - copy: lib/
        - run: npm ci
        - copy: cron_task.js
    runtime:
      command: node cron_task.js
      entrypoint: /bin/bash
      resources:
        - ItemsDatabase
      variables:
        MYSQL_URL:
          $resources: ItemsDatabase.url
lifecycles:
  - event: BeforeServices
    components:
      - MaintenanceJob
routes:
  - pattern: /api/*
    methods: [GET, POST]
    target:
      component: ApiService
  - pattern: /system/*
    internal: true
    target:
      component: ApiService
    condition:
      $request:
        not:
          cidr: [var: x-forwarded-for, 50.16.0.0/15]
resources:
  - name: MySQLDatabase
    type: mysql
  - name: S3Bucket
    type: s3

```
