---

title: "Services"
description: "Overview of Noop Services, Components for running web servers, and how to create them."
slug: "services"
section: "components"
layout: "../../layouts/Doc.astro"
pubDate: ""
order: 14

---

Service Components are for running web servers. Typically they are responsible for responding to Traffic from the public internet, they can also be used to run private APIs.

A Service can run a web server or microservice in any programming language or framework. Noop supports all container images. Popular examples of Service runtimes include:

- Node.js

- Ruby

- PHP

- Golang

- Java

- Python

# **Service Configuration**

Service defaults are configured in your Application Manifest (app.yml). Memory and cpu capacity, build process and runtime details are all defined in the app.yml.

Here is a basic example of a NodeJS service with no environment variables.

```
components:
 - name: ExampleService
   type: service
   image: node:alpine
   runtime:
     command: npm start
```

# **Routing Traffic to a Service**

By default, Services are not accessible via the public Internet. In order for clients to connect to your Services, you need to set up an Endpoint and a Route.

Endpoints are defined in the console and target a specific Environment. Once Traffic requests are forwarded from the Endpoint to your Environment, the Routes defined in your Application Manifest (app.yml) are used to determine which Component should handle that request.

Assuming an Endpoint is already created, the following app.yml will send all Traffic to the `ExampleService` component.

```
components:
 - name: ExampleService
   type: service
   image: node:alpine
   runtime:
     command: npm start
routes:
  - target:
      component: ExampleService
```

# **Connecting to a Resource**

Noop automatically manages the variables used for Resources. To associate a service with a Resource, include the Resource name in the Service’s \`runtime.resources\` property in the app.yml. Here is an example of a service that uses a MySQL Resource and surfaces the URL as a variable in the service runtime:

```
components:
 - name: ExampleService
   type: service
   image: node:alpine
   runtime:
     resources:
       - ExampleDB
     variables:
       dbUrl: $resources.ExampleDB.url
resources:
 - name: ExampleDB
   type: mysql
```

# Scaling and Sleep Settings

Service sleepiness and target instance count are environment-specific properties, they are defined in the Noop Console. To set these properties go to the Service scaling page under the Environment’s Stack settings in the Noop console.

Service sleepiness indicates whether the Service should be turned off unless it receives Traffic. When a service is set to sleep, a time duration is provided. If the service does not receive Traffic for a duration of time longer than the specified value, it will turn off. The Service will wake up when Traffic resumes. Production Environments are configured **not **to sleep, while non-production environments go to sleep by default. Defaults can be changed for production and non-production Environments.

Also on the service scaling page is target instance count. Increasing the instance count above 1 provides redundancy and increased capacity. The default target instance count is 2 for production Environments and 1 for non-production Environments. Once the Service is deployed Noop will automatically scale to the target instance count.

Services need to be designed to relaunch predictably. This is because the containers responsible for running a Service are occasionally replaced. Noop will ensure there is no disruption while replacing the containers, any filesystem and memory state used by the Service will be lost.

# Configuration Reference

Service Components are defined in your .noop/app.yml as an array under the components property.

- The `name` property is an alpha-numeric string and is required

- The `type` property is required and must be set to `service`

- The `image` property is the name of the container image. Noop supports Docker Hub images. The image property is required.

- The `build` property describes an array of steps to follow while building the service

- The `runtime` property describes properties for how the service should be executed

- The `port` property specifies which TCP port the Service listens to for HTTP Traffic, default `80`

- The `health` property specifies how to evaluate the health of a Service Instance

  - health.checker can be set to `http`, `tcp`, or `cmd`

# **app.yml Examples**

### Basic Service

```
components:
  - name: ExampleService
    type: service
    image: node:alpine
```

### Service with Build Steps

```
components:
  - name: ExampleService
    type: service
    image: node:alpine
    build:
      - copy: package*.json
      - run: npm ci
      - copy: *
      - run: npm test
```

## Service with Runtime Configuration

```
components:
  - name: ExampleService
    type: service
    image: node:alpine
    runtime:
      command: npm start
      variables:
        log_level: info
      cpu: .5
      memory: 512
```

## Service using a MySQL Resource during Runtime

```
components:
  - name: ExampleService
    type: service
    image: node:alpine
    runtime:
      resources:
        - ExampleDB
      variables:
        dbUrl: $resources.ExampleDB.url
resources:
  - name: ExampleDB
    type: mysql
```

## Service with other options

```
components:
  - name: ExampleService
    type: service
    image: node:alpine
    port: 8080
    health:
      checker: http
      path: /_health
```
