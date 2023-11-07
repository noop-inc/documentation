---

title: "Amazon DynamoDB"
description: "How to connect NoSQL database Amazon Dynamo to Noop Components."
slug: "amazon-dynamo-db"
section: "resources"
layout: "../../layouts/Doc.astro"
pubDate: ""
order: 20

---

The Amazon DynamoDB Resource is a NoSQL database solution for the Noop platform. It provides a no-configuration way to connect application services to the “Fast and flexible NoSQL database service for any scale,” [DynamoDB](https://aws.amazon.com/pm/dynamodb/).

## Key Features

- All data is encrypted at rest and in-transit using industry standard AES-256 encryption and SSL/TLS respectively.

- Browse, query, and debug your data with the Resource Explorer for DynamoDB in the Noop Console.

- Manage access automatically for all Components referencing the Resource from the Application Manifest (app.yml) file.

# Usage

To add DynamoDB to your application insert an entry in the app.yml under `resources`. Specify the `type` as `dynamodb` and include an alphanumeric name.

## Required Parameters

DynamoDB four required configuration parameters: `name`, `type`, `hashKeyName`, `hashKeyType`.

### name

Alphanumeric name used to reference the DynamoDB resource from your Application Components (Services and Tasks).

### type

Must be `dynamodb`.

### hashKeyName

Alpha-numeric name - and \_ are allowed. Required.

### hashKeyType

One of `S`, `N`,or` B`

## Optional Parameters

### rangeKeyName

Alpha-numeric name - and \_ are allowed.

### rangeKeyType

One of `S`, `N`,or` B`

## Example

Here’s a complete app.yml example:

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
         - MyTable
    variables:
      DYNAMO_ENDPOINT: $resource: MyTable.endpoint
routes:
  - pattern: /**
    target:
    component: ApiService
resources:
  - name: MyTable
    type: dynamodb
    hashKeyName: id
    hashKeyType: S
```

When a resource is connected to a Noop service the following dynamic variables are available to use within the app manifest:

- `endpoint`

- `tableName`

To reference a resource property use the special `$resource` key. See the following example:

```
variables:
  DYNAMO_ENDPOINT:
    $resource: MyTable.endpoint
```

As with all Noop resources, the resource explorer allows you to query and browse all data stored in DynamoDB. The Resource Explorer is available on the Resource page within the Noop console. Note: the DynamoDB table is only accessible to the Components that specify it as a dependency.

## Limitations

- Global Secondary Indexes are not currently available
