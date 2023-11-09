---
title: 'Postgres Database'
description: 'How to launch and configure Postgres databases alongside Noop Tasks and Services'
slug: 'postgres-database'
section: 'resources'
layout: '../../layouts/Doc.astro'
pubDate: ''
order: 18
---

The Postgres resource is a relational database solution for the Noop platform. It provides a no-configuration way to connect application services to the powerful, open-source object relational database, [Postgres](https://www.postgresql.org/).

## Key Features

- All data is encrypted at rest and in-transit using industry standard AES-256 encryption and SSL/TLS respectively.

- Browse, query, and debug your data with the Resource Explorer for Postgres in the Noop Console.

- Manage access automatically for all Components referencing the Resource from the Application Manifest (app.yml) file.

## Usage

To add Postgres to your application insert an entry in your Application Manifest (app.yml) under `resources`. Specify the `type` as `postgres` and include an alphanumeric name. The name is used to reference the resource from other Noop services or tasks.

Here’s a complete app manifest example:

```
---
components:
  - name: ApiService
    type: service
    root: api-service/
    image: node:18-alpine
    build:
      steps:
        - copy: package*.json
          destination: ./
        - run: npm ci
        - copy: index.js
        - copy: lib/
    runtime:
      command: npm start
    resources:
      - MyDatabase
    variables:
      DATABASE_URL:
        $resource: MyDatabase.url
routes:
  - pattern: /**
    target:
      component: ApiService
resources:
  - name: MyDatabase
    type: postgres
```

When a resource is connected to a Noop service the following dynamic variables are available to use within the app manifest:

- `host`

- `port`

- `username`

- `password`

- `database`

- `url`

To reference a resource property use the special \`$resource\` key. See the following example:

```
variables:
  DATABASE_URL:
    $resource:
      MyDatabase.url
```

As with all Noop resources, the resource explorer allows you to query and browse all data stored in Postgres. The resource explorer is available on the resource page within the Noop console. Note: the Postgres database is not accessible via the public internet.

## Limitations

- Database backups are not enabled by default. Use a Noop Task to schedule a database backup routine.

- Supported database version is 14
