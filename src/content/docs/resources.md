---
layout: ../../layouts/Layout.astro
title: Resources overview
description: Overview of Resources available to Noop Applications
section: Reference
order: 5
---

# Resources

Resources are for storing state within your Applications, whether that's Amazon S3 to store image files or a relational database to store customer orders. 

A Resource is created at the Environment level and can be attached to any Component in the Environment.

As you create new Environments for your Application, Noop automatically creates the necessary Resources defined in your [app.yml]().

Resources include Postgres, MySQL, Redis, Amazon DynamoDB and Amazon S3. To create a resource in your Application, specify the name, type and other Resource-specific configuration parameters.

Here is a minimal definition of each resource type:

```yaml
...
resources:
  - name: DynamoDBTable
    type: dynamodb
    hashKeyName: id
    hashKeyType: S
  - name: S3Bucket
    type: s3
  - name: EphemeralCache
    type: redis
  - name: RecordsDB
    type: postgres
  - name: OtherDB
    type: mysql
```

## name

Defines the name of the resource. **Required**.

## type

One of `dynamodb`, `postgres`, `mysql`, `s3` or `redis` **Required**.

When specifying a DynamoDB table there are a couple other required and optional properties.

## hashKeyName (DynamoDB-specific)

Alpha-numeric name `-` and `_` are allowed. **Required**.

## hashKeyType (DynamoDB-specific)

One of `S`, `N` `B` **Required**.

## rangeKeyName (DynamoDB-specific)

Alpha-numeric name `-` and `_` are allowed.

## rangeKeyType (DynamoDB-specific)

One of `S`, `N` `B`


## Referenece a resource from Application Components

To associate the resources with your Application Components (Services and Tasks) define them on the `component.[n].runtime.resources` property.

```yaml
...
    runtime:
      resources:
        - DynamoDBTable
    ...
resources:
  - name: DynamoDBTable
    type: dynamodb
    hashKeyName: id
    hashKeyType: S
```

An application can access the Resource connection parameters via environment variables.


```yaml
...
    runtime:
      resources:
        - DynamoDBTable
      variables:
          DYNAMO_TABLE:
              $resources: DynamoDBTable.tableName
          DYNAMO_ENDPOINT:
              $resources: DynamoDBTable.endpoint
    ...
resources:
  - name: DynamoDBTable
    type: dynamodb
    hashKeyName: id
    hashKeyType: S
```

## S3 Bucket

### Configuration

    - `name`: Defines the name of the resource. **Required**.
    - `type`: Value is `s3` **Required**.

### Properties

    - `bucket`
    - `endpoint`

### Example

```yaml
...
    runtime:
      resources:
        - ImagesBucket
      variables:
          S3_BUCKET:
              $resources: S3Bucket.bucket
          S3_ENDPOINT:
              $resources: S3Bucket.endpoint
    ...
resources:
  - name: ImagesBucket
    type: s3
```

## DynamoDB Table

### Configuration

    - `name`: Defines the name of the resource. **Required**.
    - `type`: Value is `dynamodb` **Required**.

### Properties

    - `tablename`
    - `endpoint`

### Example

```yaml
...
    runtime:
      resources:
        - DynamoDBTable
      variables:
          DYNAMO_TABLE:
              $resources: DynamoDBTable.tableName
          DYNAMO_ENDPOINT:
              $resources: DynamoDBTable.endpoint
    ...
resources:
  - name: DynamoDBTable
    type: dynamodb
    hashKeyName: id
    hashKeyType: S
```

## MySQL Database

### Configuration

    - `name`: Defines the name of the resource. **Required**.
    - `type`: Value is `mysql` **Required**.

### Properties

    - `username`
    - `password`
    - `host`
    - `port`
    - `database`


### Example

```yaml
...
    runtime:
      resources:
        - Inventory
      variables:
          POSTGRES_USER:
              $resources: Inventory.username
          POSTGRES_PASSWORD:
              $resources: Inventory.password
          POSTGRES_HOST:
              $resources: Inventory.host
          POSTGRES_PORT:
              $resources: Inventory.port
          POSTGRES_DATABASE:
              $resources: Inventory.database
    ...
resources:
  - name: Inventory
    type: mysql
```

## PostgreSQL Database

### Configuration

    - `name`: Defines the name of the resource. **Required**.
    - `type`: Value is `postgres` **Required**.

### Properties

    - `username`
    - `password`
    - `host`
    - `port`
    - `database`


### Example

```yaml

...
    runtime:
      resources:
        - Orders
      variables:
          POSTGRES_USER:
              $resources: Orders.username
          POSTGRES_PASSWORD:
              $resources: Orders.password
          POSTGRES_HOST:
              $resources: Orders.host
          POSTGRES_PORT:
              $resources: Orders.port
          POSTGRES_DATABASE:
              $resources: Orders.database
    ...
resources:
  - name: Orders
    type: postgresql

```

## Redis Cache

### Configuration

    - `name`: Defines the name of the resource. **Required**.
    - `type`: Value is `redis` **Required**.

### Properties

    - `protocol`
    - `host`
    - `port`
    - `username`
    - `authToken`
    - `database`

### Example

```yaml
...
    runtime:
      resources:
        - RecordCache
      variables:
          REDIS_PROTOCOL:
              $resources: RecordCache.protocol
          REDIS_HOST:
              $resources: RecordCache.host
          REDIS_PORT:
              $resources: RecordCache.port
          REDIS_USER:
              $resources: RecordCache.username
          REDIS_PASSWORD:
              $resources: RecordCache.authToken
          REDIS_DATABASE:
              $resources: RecordCache.database
          REDIS_URL:
              $resources: RecordCache.url
    ...
resources:
  - name: RecordCache
    type: redis

```
