---
title: 'Logic'
description: 'Overview of Noop Logic, uses in context.'
slug: 'logic'
section: 'core concepts'
layout: '../../layouts/Doc.astro'
pubDate: ''
order: 10
---

Noop Logic is a lightweight utility language for augmenting functionality across the Noop platform. Logic expressions are composed of operators and their parameters, which can also be nested Logic expressions. All Logic expressions conform to standard YAML syntax.

One of the most common uses of Logic is filtering Logs. Any Noop Log stream can be filtered using Logic. The following example shows how to view error-level logs only:

```
equals:
  - var: level
  - error
```

In plain english, the above says: Match all log entries where the **`level`** variable equals “error”.

In addition to **[Log filtering](http://localhost:3000/docs/Logic#log-filtering)**, Logic can:

- **[Set Application Blueprint properties](http://localhost:3000/docs/Logic#blueprint-properties)**

- **[Determine Pipeline execution criteria](http://localhost:3000/docs/Logic#pipeline-execution)**

- **[Restrict or direct Traffic from Endpoints](http://localhost:3000/docs/Logic#routing-endpoint-traffic)**

- **[Match Application Routes](http://localhost:3000/docs/Logic#conditional-application-routes)**

- **[Runbook Configuration](http://localhost:3000/docs/Logic#runbook-configuration)**

Depending on the context of the Logic expression, different data will be available as variables. In the case of Logs, Noop associates each log entry with context about the entry and the thing that produced it. Depending on the type of Log entry variables might include: **`level`**, **`component`**, **`stackId`**, etc.

When a user Application outputs its own logs in JSON format, the keys of that JSON object become variables accessible to Noop Logic as well. This means that developers can observe their custom business activity from the Noop Console.

Variables in Logic are referenced with the **`var`** operator. Some Logic operators also create their own context accessible via the **`var`** operator. See the following example that returns a list of all items greater than 2:

```
filter:
  - [2, 3, 4]
  - greater:
    - var: _item
    - 2
```

# Log Filtering

Logic expressions used in the Log filter evaluate whether each Log entry matches the condition set in Logic. In other words, a Log entry will be fetched if the Logic expression evaluates truthy for that entry.

See the Logs documentation for more information on how to apply Logic conditions.

The following example matches all log entries where the **`level`** variable equals “error”.

```
equals:
  - var: level
  - error
```

**`level`** in the example above is a JSON property of the output Log entry. Any JSON property can be used to filter the logs, including properties set by the application itself.

Outputting structured JSON from application logs automatically produces Logs that are queryable from the Noop console.

NOTE: Not all Logic operators are available for Log filtering. See the Logic reference for a complete list.

## Context

The context variable of Logs changes depending on the Log stream and also by custom properties set by application developers. See the Log documentation to learn how to inspect and create quick Log filters from the Console.

# Blueprint Properties

Within the Application Blueprint, Logic can be used to dynamically set properties. For example, an environment variable could be written to change depending on whether the Noop **`$env.production`** value is set to **`true`**. In the following example the **`NODE_ENV`** environment variable is set to **`production`** when **`$env.production`** is **`true`** otherwise it is set to **`dev`**.

```
---
components:
  - ...
    runtime: ...
      variables:
        NODE_ENV: $env:
          if: - var: production
            - production
            - dev
```

## Context

- _$app_: data about the Noop Application.

- _$env_: data about the Noop Environment.

- _$build_: data about the Noop Build.

- _$source_: data about the Noop Source (repository).

- _$resources_: data about the Noop Resource.

- _$stack_: data about the Noop Stack.

# Pipeline Execution

Pipelines execute when their **`condition`** property evaluates _truthy_. The **`condition`** property is evaluated as Logic and has a **`$repoevent`** context. The **`$repoevent`** context includes all of the **[Github webhook data](https://docs.github.com/en/webhooks/webhook-events-and-payloads)** Noop receives when code is pushed to Github.

```
condition:
  $repoevent:
    and:
      - equals:
        - var: payload.ref
        - refs/heads/dev
      - equals:
        - var: type
        - push
      - ifnot:
        - var: payload.deleted
workflow:
  steps:
    - name: SourceCode
      params:
        reference:
          $pipeline: RepositoryEvent.payload.after
        appId:
          $pipeline: Application.id
      action: SourceCodeLookup
```

## Context

- _$repoevent_: data about the Github repository event. Data includes a **`type`**property, which indicates which event took place and **`payload`** property which includes the raw **[Github webhook data](https://docs.github.com/en/webhooks/webhook-events-and-payloads)**

The workflow steps contains context as well.

- _$pipeline_: data about the pipeline itself. Includes **`RepositoryEvent`**, **`Application`**, and **`Organization`** data.

# Routing Endpoint Traffic

When creating an Endpoint Route, it’s possible to specify a Logic condition which will forward traffic only when the condition evaluates _truthy_. To block certain IP addresses, for example, a condition could be assigned to a *Black Hole*route, effectively blocking all incoming requests from those IPs.

See the following example:

```
$request:
  includes:
    - - 42.42.42.42
      - 7.7.7.7
    - var: x-forwarded-for
```

## Context

- _$request_: data includes headers properties of the incoming request.

# Conditional Application Routing

Similar to routing Endpoint Traffic, it’s also possible to conditionally route Traffic at the application level. Application route conditions are configured within the blueprint.yaml. This could be used to allow specific routes for users coming from a specific network.

See the following example:

```
$request:
  includes:
    - - 42.42.42.42
      - 7.7.7.7
    - var: x-forwarded-for
```

## Context

- _$request_: data includes headers of the incoming request.

# Runbook Configuration

Runbooks are procedures that handle operational responsibilities for your software. Runbooks execute a Workflow, which have access to Organization, Application and Source Code data.

## Context

- _$runbook_: data about the runbook itself. Includes **`Organization`**, **`Application`**, and **`SourceCode`** data.

​\
​
