---
title: 'Local Development'
description: 'Overview and guide for developing Applications locally using Noop Workshop.'
slug: 'local-development'
section: 'getting started'
layout: '../../layouts/Doc.astro'
pubDate: ''
order: 5
---

Local development on Noop is done with the Workshop product. Worshop is a local software development product included as part of the Noop desktop app.

Workshop simulates the experience of running a cloud application -- locally (no internet dependencies). All of the platform Components, Resources and tools available in Noop Cloud are also available in Workshop.

# Installation

Download and install the [Noop Desktop app](https://noop.dev/docs/introduction/).

# Project setup

Workshop automatically detects Applications configured to run on Noop. Meaning any source repository with a `.noop` directory containing a `blueprint.yaml` file will register as a Workshop Application.

### Starting a New Application

The fastest way to get an Application up and running on Workshop is to start with a Template. There are Templates available for many familiar languages and platforms. 

On the Workshop home screen there is a panel with a selection of available Templates. Choose one and follow the instructions to finish creating the new Application.

Once complete, the Template is ready to run. There is some platform-specific setup for the templates, which can be found in their associated guides.

### Developing an Existing Application

Workshop will attempt to find existing Applications located on your filesystem. If you don't see your Application in the Applications list on the Workshop dashboard, add it by pressing the "Add Application" button and pointing Workshop to the appropriate directory.

Once added, a "Default" Environment is created for the Application. Navigate to the Environment and toggle the on switch located at the top of the left-hand page panel.

# Run the project

On the Application Environment page click the on toggle at the top of the left-hand panel. Once clicked, the project will launch all Application Components and Resources defined in your blueprint.yaml.

## Application Logs

All of your Application Component and Resource logs are available at the bottom of the project page. To view an individual Component or Resource’s Logs, click on the Component or Resource name on the project overview page.

[Logs](/docs/logs/) can be filtered exactly as in Noop Cloud.

## Environment Variables

Variables can either be defined in blueprint.yaml or from the Local Console. To define a variable from the Console, select the Component you want to add a variable to. On the component overview page there is a form to input variable names and values. Each variable can optionally be included as a secret, meaning its value will be encrypted.

## Container Terminal

Every Service Container can be accessed directly via a Terminal. To open a Service terminal, go to the Service Component overview page and click the “Open Terminal” button.

## Interacting with Resources

The data within all Resources is available for viewing and in the case of `dynamodb`, `mysql`, `postgres`, and `redis` editing as well. The Explorer for every Resource is available at the bottom of every Resource page.

# Updating the project

Any changes to your project, whether the blueprint.yaml or the source code of any Component, Workshop will automatically relaunch with the updates.

## Adding and removing Resources and Components

The blueprint.yaml is where all Application Resources and Components are defined. To add a new one or remove an existing one, edit and save the `.noop/blueprint.yaml` file. Once blueprint.yaml is saved Noop Desktop will rebuild your environment according to your changes.

## Recovering from blueprint.yaml Validation Errors

If your blueprint.yaml is invalid, a validation error will be displayed on the Project page. You will need to restart the project by clicking right-facing triangle button to the right of the status field on the Project page.
