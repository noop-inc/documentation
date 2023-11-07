---

title: "Traffic and Routes"
description: "How to Route Traffic from the internet and within your Noop Apps"
slug: "traffic-and-routes"
section: "core concepts"
layout: "../../layouts/Doc.astro"
pubDate: ""
order: 4

---

# Overview

Traffic and Routes are, among other things, how users will see your Application on the public Internet, and how your client Application Components will make API requests to your Service Application Components.

It all starts with an Endpoint. Endpoints are a group of Routes associated with a domain or sub-domain. The domain or sub-domain can be your own or a sub-domain of **`noop.app`**.

Endpoints are primarily responsible for routing Traffic to a Noop Application Environment. They can also proxy requests to hosts outside Noop, redirect Traffic, produce error responses and send Traffic into a black hole.

When Traffic resolves to a specific Environment, there are another set of Routes defined in the app.yml which determine the Component for handling the request.

By default all Application Components are private. They are only available on the public Internet when two things happen: the app.yml associates a Route with the Component and an Endpoint specifies a Route for the running Application Environment. In some cases you might want to associate a Route with a Service Component and keep the Service internal, see **[internal Routes](http://localhost:3000/docs/routing#internal-routes)**.

# Endpoints

Endpoints are primarily used to associate a domain or sub-domain to your Application. Endpoints are defined in the Noop Console, on the Organization page.

The most common use of an Endpoint is routing Traffic to an Application Environment. It’s also possible to create a Route that proxies Traffic to an external host, redirects Traffic, returns an error page, or sends the request to a black hole.

For any Endpoint type it’s Traffic can be filtered to only handle requests that match a path pattern, HTTP method or a Logic condition.

An endpoint can have multiple Route rules, the first Route matched for a given request is the one that will be used. The order of the Routes can be adjusted by dragging the definitions up or down in the list of Endpoint Routes. The Routes are evaluated from top to bottom.

## Creating Endpoints

Go to the Organization page you would like to create an Endpoint for.

At the top of the Endpoints list in the left-hand panel, click “New Endoint”.

![](/assets/docs/imgs/d1f44908-ba8d-412e-8d65-fe3650e4b0d9.png)

Choose whether you want an external or managed domain (your domain or \[sub-domain].noop.app). Creating an external Endpoint requires you to update the DNS of your domain registrar.

![](/assets/docs/imgs/4c9217a7-38ad-4727-ae59-7dd4a3f7f362.png)

Complete the form and click “Create Endpoint”.

## Creating Endpoint Routes

On the Endpoint page, click “Create New Route”

![](/assets/docs/imgs/a6b3612c-b3e8-4def-a07d-08a04b36ccc1.png)

![](/assets/docs/imgs/7f11e8ba-c8d6-4a68-b7b9-15ca3d28cc2d.png)

The Route name can be any text you want.

The Route target type can be a Noop Environment, External Proxy, Redirect, Error Response, or Black Hole.

All Route types have rules determining when they match a request. The most basic rules are path patterns (requests that match a specific URL path pattern), or HTTP methods (a selection of HTTP methods). More complex rules can be defined by use of Logic. Logic conditions can evaluate all request headers, this includes the source IP.

To add the rule, click the green "Add" button. Once you are finished adding Routes, click the blue "Update Routes" button.

**Note: **For a request to match a Route, the request must satisfy all rules associated with the Route. For example if a Route only allows HTTP **`POST`** methods and the **`/api/**`** path pattern, a request must be both a **`POST`** *and* on the **`/api/**`** path.

# Application Routes

Application routes, unlike Endpoint Routes are defined in the Application Manifest (app.yml).

A simple Application might only have one component. Here is an example app.yml with a single Component and Route:

```
---
components:
  - name: ApiService
    type: service
    image: node:18-alpine
    build:
      steps:
       - copy: package*.json
       - run: npm ci
       - copy: index.js
       - copy: lib/
    runtime:
      command: npm start
routes:
  - target:
      component: ApiService
```

In this case only one Route is necessary to get Traffic from an Endpoint to the Component. All Traffic routed to this Application will resolve to the **`ApiService`** component.

## Routing Traffic by path patterns

A slightly more complicated Application might have a client-side Component and a server-side API:

```
---
components:
  - name: ApiService
    type: service
    root: api-service
    image: node:18-alpine
    build:
      steps:
       - copy: package*.json
       - run: npm ci
       - copy: index.js
       - copy: lib/
    runtime:
      command: npm start
  - name: Website
    type: static
    image: node:18-alpine
    root: website-static
    hosting:
      spa: true
    build:
      steps:
        - run: npm ci
        - run: npm run build
        - directory: dist/
routes:
  - pattern: /api/**
    target:
      component: ApiService
  - target:
      component: Website
```

Here any Traffic request under the **`/api/**`** Route will resolve to the **`ApiService`** Component, all other requests will resolve to the **`Website` **Component.

Routes can be configured to match requests on path patterns, HTTP methods, and Logic conditions.

## Internal Routes

In some cases your Application will have a Service Component that should only be accessible from within your Application network, and not on the public Internet. To create a private Route, set the **`internal`** flag on the Route configuration.

```
---
components:
  - name: ApiService
    type: service
    root: api-service
    image: node:18-alpine
    build:
      steps:
       - copy: package*.json
       - run: npm ci
       - copy: index.js
       - copy: lib/
    runtime:
      command: npm start
- name: PrivateApiService
    type: service
    root: internal-api-service
    image: node:18-alpine
    build:
      steps:
       - copy: package*.json
       - run: npm ci
       - copy: index.js
       - copy: lib/
    runtime:
      command: npm start
routes:
  - pattern: /__internal__/**
    internal: true
    target:
      component: PrivateApiService
  - target:
      component: ApiService
```

In the example above any Traffic requests for the pattern **`/__internal__/**` **made from the public Internet will resolve to the **`ApiService`** Route because **`PrivateApiService`** is not available publicly. However, the ApiService Component will be able to make requests to the **`/__internal__/**`** pattern by using the **`http://localstack/__internal__/`** URL.

## Localstack

Localstack is a host name available to Service and Task Components used for requesting internal-only routes. Requests to Localstack are protected, they never leave your Application network. Localstack also eliminates the need to assign host names to your services, create DNS entries and surface those names in environment variables to your different Application Components. All Application routes are accessible to other Components in the same Application using the **`http://localstack`** URL.

​\
​
