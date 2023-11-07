---
layout: ../../layouts/Layout.astro
title: Local development
description: Overview of building applications locally.
section: Guides
order: 5
---

## Installation

1. Download and install [Docker](https://docs.docker.com/get-docker/). Make sure it is running on your computer.
2. Download and install the [Noop Desktop app](https://noop.dev/download). 

## Project setup


Open Noop Desktop. In the left-hand menu, select "Local Development".

This guide uses the [NodeJS Todo application Blueprint](https://github.com/noop-inc/blueprint-todo-nodejs-vue). To follow along, clone that repository.

If you'd like to use your own project, make sure you have a Noop application manifest (app.yml) in the `.noop` directory at the root of your project.

Once you have a Noop project on your local computer, import it into Noop:

- Click "New Project" at the top of the Projects list.
- Choose the directory of the source code cloned from earlier.
- Choose a project name
- Click "Create Project"

Once that's done you should see a success message modal. At the bottom of this modal is an option to "Create Endpoint". Creating an Endpoint will produce a URL to view your project once it is launched (locally). Click the "Create Endpoint" button.

Choose a subdomain and click the "Create Endpoint" button. Note: this domain is pointed to your local computer. The benefit to the local Endpoint setup is your apps will be served over HTTPS on the default port 443. However, the Endpoint is not accessible from the public internet.

## Run the project

On the project page click the right-facing triangle icon button to the right of the status indicator. Once clicked, the project will launch all Application Components and Resources defined in your app.yml.

### Application Logs

All of your Application Component and Resource logs are available at the bottom of the project page. To view an individual Component or Resource's Logs, click on the Component or Resource name on the project overview page.

Logs can be filtered exactly as in Noop Cloud.

### Environment Variables

Variables can either be defined in app.yml or from the Local Console. To define a variable from the Console, select the Component you want to add a variable to. On the component overview page there is a form to input variable names and values. Each variable can optionally be included as a secret, meaning its value will be encrypted.

### Container Terminal

Every Service Container can be accessed directly via a Terminal. To open a Service terminal, go to the Service Component overview page and click the "Open Terminal" button.

### Interacting with Resources

The data within all Resources is available for viewing and in the case of `dynamodb`, `mysql`, `postgres`, and `redis` editing as well. The Explorer for every Resource is available at the bottom of every Resource page.

## Updating your project

Any changes to your project, whether the app.yml or the source code of any component, Noop Local will automatically relaunch with the updates.

### Adding and removing Resources and Components

The app.yml is where all Application Resources and Components are defined. To add a new one or remove an existing one, edit and save the `.noop/app.yml` file. Once app.yml is saved Noop Desktop will rebuild your environment according to your changes.

### Recovering from app.yml Validation Errors

If your app.yml is invalid, a validation error will be displayed on the Project page. You will need to restart the project by clicking right-facing triangle button to the right of the status field on the Project page.
