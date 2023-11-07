---

title: "Blueprints (app.yml)"
description: "Describing how to run your Software, with Source Code"
slug: "application-manifest-app-yml"
section: "core concepts"
layout: "../../layouts/Doc.astro"
pubDate: ""
order: 2

---

# Specification

The Noop app.yml file defines your application's components, routes, resources, and lifecycle events.

## components

The app.yml must declare a `components` root element as a list of objects containing configuration for each component in your application. At least one component object must be defined.

```yaml
components:
  - name: webserver
    ...
  - name: api
    ...
```

### name

Defines the name of the component. Each component `name` must be unique. **Required**.

### type

Specifies the type of the component; must be one of `service`, `task`, or `static`. **Required**.

### image

Sets the base image from which the component is built. **Required**.

### port

The container port to expose.

### root

Establishes the docker build context, setting the host working directory for `copy` and `run` build step commands.

### build

Defines a series of `steps` to be executed in creating the component image. Steps are defined as an array of mappings, where the mapping key is the step instruction and mapping value are arguments for that instruction.

### steps

#### directory

Sets the working directory of the image for build step commands that follow.

#### copy

Copies files from the host to the image. The copy step can take both string and array types as an argument. Strings can use the wildcard symbol '\*' to pattern match files. Arrays must have at least one element, where elements represent individual files to be copied from host to image. The copy step object can be used in conjunction with the optional `destination` key to specify the image directory in which files are to be copied.

```yaml
...
    build:
      steps:
        - directory: /express
        - copy: package*.json
          destination: ./
        - copy: [index.js, dynamodb.js, s3.js]
          destination: ./
    ...
```

#### run

Executes a command in the current working directory. If no directory step precedes the run step, the command will execute in the base image's working directory.

#### image

Specifies an image to be used for multi-stage builds. The optional `stage` key can be used to name the build stage. The build stage should be a `string` value and cannot equal `main`, which is the name of the primary build stage.

```yaml
    build:
      steps:
      ...
        - image: node:10
          stage: server-build
      ...
```

### runtime

`runtime` defines properties associated with a component instance. `runtime` properties affect build [Deployments](https://github.com/noop-inc/documentation/blob/app-manifest-update/docs/Deployments.md), specifying container execution commands, instance memory, component resources, and component variables.

#### resources

Resources that a component will use must be defined in the `resources` property of a component's runtime section. Resources are an array of strings, where the string value corresponds to the name of the resource as defined in the AppManifest resources (provide link) section.

```yaml
...
    runtime:
      resources:
        - DynamoDBTable
        - S3Bucket
    ...
resources:
  - name: DynamoDBTable
    type: dynamodb
    hashKeyName: id
    hashKeyType: S
  - name: S3Bucket
    type: s3
```

#### entrypoint

Defines a container ENTRYPOINT instruction used to specify a command that will be executed when the container starts.

#### command

Defines a container CMD instruction used to specify a command that will be executed when the container starts. If used in conjunction with `entrypoint`, the value of `command` specifies arguments that will be passed to the `entrypoint` command.

#### cpu

Used to specify the number of cpu cores of a component instance.

#### memory

Used to specify the memory (in MB) of a component instance.

#### variables

Defines variables to be used at runtime. Each variable is a mapping object, where the object key is the variable name and object value is the variable value. Variables can make use of Noop logic to access object values within certain scopes. A common pattern to assign a variable the value of a resource property is to use the `$resources` scope object with the corresponding resource object and property.

```yaml
...
    runtime:
    ...
      variables:
        S3_BUCKET:
          $resources: ImagesBucket.bucket
        S3_ENDPOINT:
          $resources: ImagesBucket.endpoint
        LOG_LEVEL: info
```

## resources

Resources include Postgres, MySQL, Redis, Amazon DynamoDB and Amazon S3. To create a resource in your Application, specify the name, type and optional configuration parameters.

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

### name

Defines the name of the resource. **Required**.

### type

One of `dynamodb`, `postgres`, `mysql`, `s3` or `redis` **Required**.

### How to referenece a resource from Application components

To associate the resources with your Application components (Services and Tasks) define them on the `component.[n].runtime.resources` property.

```yaml
...
    runtime:
      resources:
        - DynamoDBTable
        - S3Bucket
    ...
resources:
  - name: DynamoDBTable
    type: dynamodb
    hashKeyName: id
    hashKeyType: S
  - name: S3Bucket
    type: s3
```

When specifying a Dynamo table there are a couple other required and optional properties.

### hashKeyName (Dynamo-specific)

Alpha-numeric name `-` and `_` are allowed. **Required**.

### hashKeyType (Dynamo-specific)

One of `S`, `N` `B` **Required**.

### rangeKeyName (Dynamo-specific)

Alpha-numeric name `-` and `_` are allowed.

### rangeKeyType (Dynamo-specific)

One of `S`, `N` `B`

## routes

Routes get internet traffic to your Application. Specifically, Routes connect your Application's Service and Static components to the internet.

### target

The name of the `static` or `service` component to send Traffic to. **Required**

### pattern

String representing the URL path portion to match when forwarding Traffic. Accepts `/*` and `/**` notation.

### internal

Boolean. Determines whether the route is publicly accessible.

### methods

Array of HTTP methods, `GET`, `HEAD`, `POST`, `PUT`, `DELETE`, `CONNECT`, `OPTIONS`

### condition

Uses Noop Logic. Other conditional rules to determine if traffic should resolve to target.

## lifecycles

Lifecycle events allow your Application to run a task or group of tasks when the specified event is triggered.

### event

One of `BeforeTraffic` or `BeforeServices`. **Required**

### components

Array of `task` Components. Components are executed in series. **Required**

# Complete app.yml Example

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
