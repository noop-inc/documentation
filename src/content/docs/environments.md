---
title: 'Environments'
description: ''
slug: 'environments'
section: 'core concepts'
layout: '../../layouts/Doc.astro'
pubDate: ''
order: 12
---

Environments are an isolated space for a single instance of an [Application](/docs/applications/). They run on a designated Cluster and contain the [Resources](/docs/resources/) needed by the Application.

Locally, in Noop Workshop, Environments are used exactly as they are in Cloud. Environments will each have their own database and storage resources as well as their own Secrets and Variables.

An Environment can be created manually from the Application dashboard or dynamically by a Pipeline or Runbook.

## Configuration using Variables and Secrets

Variables and secrets can be used to configure Application runtime parameters. Variables are either defined in the Environment settings (in console) or in the Application Blueprint (blueprint.yaml).

Secrets are defined exclusively in the console. Secrets are encrypted at rest and obfuscated in logs.

In addition to user-defined Variables and Secrets, dynamic variables can be used to create connections between Application Components and Resources.

See the [Variables and Secrets](/docs/creating-environment-variables-and-secrets/) guide for more usage details.

## Deployments

The running software in an Environment is referred to as a Stack. The Stack represents a single Build Deployment. In other words the software running in an Environment relates one-to-one with a Build.

A Build is the combined Variable/Secret configuration and Source Code artifact.

## Previews

In response to a repository event, such as a pull request, a Pipeline is able to create a temporary preview environment. The preview Environment utilizes an existing environment as the foundation to create the one-off.

The preview Environment will remain online until the configured shutdown period elapses.
