---
layout: '../../layouts/Doc.astro'
title: Applications
slug: applications
description: ''
section: core concepts
order: 3
---

Applications are software components that run together. Noop Applications map 1:1 with a code repository. An Application can be a single service (possibly with a database requirement) or a monorepo that includes a collection of services, tasks and resources.

Define an Application using the Noop [`blueprint.yml`](/docs/blueprints/) configuration in the project's `.noop` directory. The `blueprint.yml` is responsible for defining all aspects of your Application including:

- Components: static assets, scheduled tasks, and container services
  - Build processes for each Component
  - Runtime details for each Component
- Resources: MySQL, Postgres, Redis, Amazon S3, and Amazon DynamoDB
- Routes: definition of which routes serve each `static` and `service` Components

The Application dashboard in the Noop Console contains links to Builds, repos (Source Code), Environments and Pipelines (CI/CD).

## Builds

Each component must define its own build process. The container in the final build step will be used for the Component runtime.

## Source Code

Applications can be linked to a Repository to integrate with its code and events automatically. Linked Repositories connect Source Code to Builds and trigger [Pipelines](/docs/pipelines/).

## Environments

Environments are instances of the Application. They contain their own Resources, Variables/Secrets, and scaling configuration. Typically Environments are created once and remain active indefinitely i.e. a `prod` or `staging` env. However, it's also possible to create temporary preview Environments in response to a pull request.

## Pipelines

Pipelines are a series of instructions (a Workflow) initiated by a repository event. Once initiated, the Pipeline can manage any aspect of an Application. Typically this process involves deploying a new Build to a specific Environment in response to a Source code push on a specific branch.
