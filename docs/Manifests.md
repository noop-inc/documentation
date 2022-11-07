# Manifests

## AppManifest Specification

The AppManifest YAML file defines your application's components, routes, resources, and lifecycle events.  

### Components top-level element

An AppManifest must declare a `components` root element as a list of objects containing configuration for each component in your application. At least one component object must be defined.

```yaml
components:
  - name: webserver
    ...
  - name: api
    ...
```

<!-- <details> -->

#### name
Defines the name of the component. Each component `name` must be unique. **Required**.

#### type

Specifies the type of the component; must be one of `service`, `task`, or `static`. **Required**.


#### image

Sets the base image from which the component is built. **Required**.


#### port

The container port to expose.

#### root

Establishes the docker build context, setting the host working directory for `copy` and `run` build step commands. 

#### build

 Defines a series of `steps` to be executed in creating the component image. Steps are defined as an array of mappings, where the mapping key is the step instruction and mapping value are arguments for that instruction. 

 Steps:

 ##### directory

 Sets the working directory of the image for build step commands that follow. 

##### copy

 Copies files from the host to the image. The copy step can take both string and array types as an argument. Strings can use the wildcard symbol '*' to pattern match files. Arrays must have at least one element, where elements represent individual files to be copied from host to image. The copy step object can be used in conjunction with the optional `destination` key to specify the image directory in which files are to be copied.

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

##### run

Executes a command in the current working directory. If no directory step precedes the run step, the command will execute in the base image's working directory.

##### image

Specifies an image to be used for multi-stage builds. The optional `stage` key can be used to name the build stage. The build stage should be a `string` value and cannot equal `main`, which is the name of the primary build stage.

```yaml
    build:
      steps:
      ...
        - image: node:10
          stage: server-build
      ...
``` 

#### runtime

`runtime` defines properties associated with a component instance. `runtime` properties affect build [Deployments](/docs/Deployments.md), specifying container execution commands, instance memory, component resources, and component variables.

##### resources

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

##### entrypoint

Defines a container ENTRYPOINT instruction used to specify a command that will be executed when the container starts.

##### command

Defines a container CMD instruction used to specify a command that will be executed when the container starts. If used in conjunction with `entrypoint`, the value of `command` specifies arguments that will be passed to the `entrypoint` command. 

##### cpu

Used to specify the number of cpu cores of a component instance.

##### memory

Used to specify the memory (in MB) of a component instance.

##### variables

Defines variables to be used at runtime. Each variable is a mapping object, where the object key is the variable name and object value is the variable value. Variables can make use of Noop logic to access object values within certain scopes. A common pattern to assign a variable the value of a resource property is to use the `$resources` scope object with the corresponding resource object and property.

```yaml
    runtime: 
    ...
      variables:
        S3_BUCKET:
          $resources: ImagesBucket.bucket
        S3_ENDPOINT:
          $resources: ImagesBucket.endpoint
        LOG_LEVEL: info
``` 

<br>
 
<!-- <details> -->


<!-- </details> -->

<!-- </details> -->

<!--
|              **Field**                   | **Type** |                                      **Description**                                      |
|:----------------------------------------:|:--------:|:-----------------------------------------------------------------------------------------:|
|  <span id="components-name">name</span>     | `string` |                 **_REQUIRED_** The name of the component; must be unique.                 |
|  <span id="components-type">type</span>     | `string` | **_REQUIRED_** The type of the component; must be one of `service`, `task`, or `static`.  |
| <span id="components-image">image</span>    | `string` |                                 **_REQUIRED_** The image                                  |
| <span id="components-port">port</span>      | `int`    |                                 _OPTIONAL_ The container port to expose.                  |
| <span id="components-port">root</span>      | `string` |  _OPTIONAL_ Sets the working directory for **copy** and **run** build step commands       |
| <span id="components-scaling">scaling</span>| `string` |  _OPTIONAL_ Sets the working directory for **copy** and **run** build step commands       |

-->

<!--
#### **scaling**

`scaling` Sets scaling policies for component instances in a stack.

```yaml
components:
  - name: webserver
    type: service
    image: nginx
    port: 80
    scaling:
      # minimum: 1
      # maximum: 3
      target: 2
      # autopilot: true
```
##### **minimum**
`minimum` The minimum number of instances present in a stack at all times. When a scale down event occurs, the number of remaining instances in the stack will never be less than this number.

##### **maximum**
`maximum` The maximum number of instances present in a stack at all times. When a scale up event occurs, the number of instances in the stack will never be greater than this number

##### **target**
`target` 

-->



## AppManifest Sample

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
