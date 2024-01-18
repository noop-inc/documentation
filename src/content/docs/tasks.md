---
title: 'Tasks'
description: ''
slug: 'tasks'
section: 'components'
layout: '../../layouts/Doc.astro'
pubDate: ''
order: 15
---

Tasks are a type of Component for executing one-off or repeating and short-running processes. Tasks are defined in the Application Blueprint (blueprint.yaml). Tasks can either run on a cron schedule, in response to deployment hooks (`BeforeTraffic` and `BeforeServices`), or by manual execution via the Console Stack page.

Each time a Task is run, a Task Execution is created. The Execution is considered successful if its process exits with `exitCode=0`. All other exitCode values are considered Task failures.

To receive Notifications about Task failures, toggle the “Task Failure” option under the Notification menu on the Environment Dashboard.

![Screenshot showing the Notification menu on the Environment page](/assets/docs/imgs/b500f833-cd71-4c7b-9313-2206f34b6e01.png)

# Cron Tasks

To run a Task on a cron schedule, specify the cron pattern in the blueprint.yaml along with the Task definition.

The following example shows a complete Task definition in the blueprint.yaml. It uses the cron schedule, build and runtime configurations and environment variables.

```
components:
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
```

# Lifecycle Tasks

Tasks can be executed at two specific moments during the deployment process, `BeforeServices` and `BeforeTraffic`.

The `BeforeServices` lifecycle hook is available for executing a Task before the new Service Instances are launched. This is a great option for database migrations, schema changes, and other administrative processes.

The `BeforeTraffic` lifecycle hook is available for executing a Task during a Deployment before the final step of sending Traffic to the new Stack. This is a great option for executing integration tests against the new Stack once everything is ready, but prior to it handling Traffic.

Here is an example showing the use of a lifecycle hook Task:

```
components:
 - name: MaintenanceJob
   type: task
   image: nodejs:alpine
   root: my-task/
   build:
     steps:
       - directory: /src
       - image: foo
         stage: bar
       - copy: [package-lock.json, package.json]
         destination: /dist
         from: main
       - copy: lib/
       - run: npm ci
       - copy: task.js
   runtime:
     command: node task.js
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
```

# Manually Running Tasks

Any Task defined in blueprint.yaml can be run manually from the Console. To run a task manually navigate to the deployed Stack page. Select the Task from the dropdown at the bottom of the left-hand panel under the “Execute Task” heading. Click the right-arrow button adjacent to the dropdown.

![Screenshot showing the panel on the Stack page which includes the "Execute Task" section](/assets/docs/imgs/340324e5-3755-42c8-b024-f79bee4894a7.png)

# Accepting Input and Producing Output

Tasks support handling input JSON data via stdin and outputting data via stdout if the last line output is parsable JSON.

# **More Examples**

## **Puppeteer Browser Integration Tests during Deployment**

This blueprint.yaml example shows how to execute browser integration tests during a Deployment. The \`BeforeTraffic\` lifecycle hook means that this Task will run after the new Stack is ready, but before any Traffic is routed to it. Which happens to be a great time to run integration testing and apply a final check before setting the deployment live.

```
---
components:
 - name: BrowserValidation
   type: task
   image: noop-inc/puppeteer
   build:
     - copy: tests/
lifecycles:
 BeforeTraffic:
   - BrowserValidation
```

## **Sqitch Database Migration during Deployments**

This is an blueprint.yaml showing how to migrate database changes in MySQL or PostgreSQL Database Resources. [Sqitch](http://sqitch.org/) is a great, open-source database change management tool for managing schema changes in Source Code. The BeforeServices lifecycle hook means that this Task will run during a Deployment before any other Components start.

```
---
components:
 - name: MigrateSchema
   type: task
   image: noop-inc/sqitch
   build:
     - copy: db/
lifecycles:
 BeforeServices:
   - MigrateSchema
```
