---

title: "Redis Cache"
description: "How to create and use Redis Resources within Noop"
slug: "redis-cache"
section: "resources"
layout: "../../layouts/Doc.astro"
pubDate: ""
order: 16

---

The Redis Resource is a high-speed, in-memory database storage solution for Noop Cloud and Noop Desktop. It provides a way to connect your software Components to the in-memory database, [Redis](https://redis.com/), without the need to configure individual database settings.

## Key Features

- Handle your software needs for high-performance caching and key-value storage.

- Rest secure knowing your data is encrypted at rest and in transit.

- Browse, query, and debug your data with the Resource Explorer for Redis in the Noop Console.

- Manage access automatically for all Components referencing the Resource from the AppManifest file.

## Usage

To add Redis to your application insert an entry in your AppManifest under `resources`. Specify the `type` as `"redis"` and include an alphanumeric name. The name is used to reference the Resource across the Environment.

### Example

AppManifest example of a Service written in Node.js utilizing a Redis Resource

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
      resources:
        - RedisCache
      variables:
        REDIS_URL:
          $resources: RedisCache.url
routes:
  - target:
      component: ApiService
resources:
  - name: RedisCache
    type: redis
```

## General Notes

- The Redis Resource should be treated as an ephemeral cache, not a durable data storage strategy.

- Noop currently supports version 7.0. Future releases will enable configuration of later versions.

### Limitations

- Subscribe, Monitor commands are not supported in the resource explorer (they are supported in the resource itself), they are planned and will roll out in upcoming releases.
