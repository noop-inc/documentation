---
title: 'Logs'
description: 'Overview of Log types and how to query them.'
slug: 'logs'
section: 'core concepts'
layout: '../../layouts/Doc.astro'
pubDate: ''
order: 6
---

## Overview

Noop logs everything. From activity on Traffic Endpoints all the way down to the Service Instances, every piece of your Application is observable through the Logs.

Logs are accessible from the Noop Console. Each page has a panel showing the associated Log stream open to the live tail. It’s possible to query the Log view to a specific date, time and content criteria (such as error conditions).

All Noop Logs are structured as JSON and can be filtered with Noop Logic. See the [log filtering](/docs/filtering-logs/) docs for an overview of how to query the logs. When you output your own logs in JSON format, they also become queriable with Logic.

Noop also supports full-text search for all Logs.

## Live Tailing

When viewing recent logs without specifying an end time, Noop will automatically tail and stream the log events to you.

## Log types

### Build Logs

A Noop Build is the build phase of every Component within an Application. Builds are accessible from the Application Dashboard page.

![Screenshot showing Application overview with list of Builds.](/assets/docs/imgs/b91e1701-61af-43a4-9340-6147aea9d06b.png)

The Build Logs show the output of each Component build. Build logs can be filtered to an individual Component using the log filter function.

To filter Logs by a component click a line in the Log from the desired component. Hover over the “component” property and click the three stacked horizontal lines to the left.

![Screenshot showing log filtering by Component name property.](/assets/docs/imgs/e91eb2b7-70c1-494a-8406-f5cfe1e1e9e3.png)

![Detail screenshot showing Filter logs by Component property.](/assets/docs/imgs/de23f791-d87c-4be6-b62f-8eebe7c7991c.png)

Click “Filter logs by this Component value”. This will update the log view to show only the Logs from that specific component.

### Traffic Endpoint Logs

Here you will see all requests to your public Endpoints. Each request to the Endpoint will show the request itself, the rule that handled the request, and the response.

The most common Traffic Log sequence will show `traffic.request`, `traffic.forward` and `traffic.response` Events.

![Screenshot of Traffic Log panel showing a typical request sequence.](/assets/docs/imgs/8513b52c-ebe1-47a7-b347-79c33c7f2824.png)

Traffic forward is the Event type indicating traffic sent to an Application Environment. See [Traffic and Routing](/docs/traffic-and-routes/) for details on how Traffic is resolved.

### Environment Logs

Environment Logs are an aggregate view of all Component output and Environment Traffic logs. Environment Logs are available on the Monitoring page.

![Screenshot of Environment dashboard menu indicating link to Monitoring page](/assets/docs/imgs/452cb2b1-c173-4f77-a162-31175184b637.png)

From this view it’s possible to filter Logs by a specific time range, Stack, Component, Instance or any other filter criteria available from the JSON output of the Logs themselves.

In addition to the high-level Environment Log view there are three other useful Log entry-points: Stacks, Components and Service Instance Logs. Each of these views is a filter of the top-level Environment Log. Note: it’s possible to create the same filter of each of these views from the Monitoring page.

Opening the Log filter menu on each of these pages will show the exact filter that was applied to the Environment Logs.

#### Stack Logs

This is the aggregate view of logs from all Services and Tasks for a given Stack (a Stack is usually representative of a unique deployment).

Navigate to the Stack from the Environment Dashboard page.

![Screenshot of Environment page summary showing active Stacks.](/assets/docs/imgs/4b630719-9745-4eeb-a97f-e30cfaa7d0e2.png)

This is useful to identify if an issue is related to a specific Deployment.

#### Stack Component Logs

All Logs of a Task or Service running within a Stack. Viewing component logs allows you to see all Component activity across the Instances of a Stack.

Navigate to the Component from the Stack Dashboard page

![Screenshot of Stack overview page showing Service Component List.](/assets/docs/imgs/c56f7e9e-14bd-4f16-9821-3ab9dee4b11d.png)

#### Service Instance Logs

The Task or Service Logs of a particular instance. Service Instance Logs are valuable to identify issues that are particular to a specific instance.

Navigate to the Instance from the Component Dashboard page.

![Service Component overview page showing Service Instances.](/assets/docs/imgs/fbd774ce-2745-4aa5-8128-e59f5cd2d24b.png)

### Event Logs

Event Logs are intended to show an overview of activity across your Applications. Each of the three Event logs can be found on their respective dashboard page.

Organization Events are the highest level and show all events down to the Environment level. Application and Environment Event streams are filtered views of the Organization. Below are event types available at each level.

#### Organization Events

Shows events related to the Organization, they include:

- Applications

- Endpoints

- Environments

- Runbooks

- Pipeline Executions

- Builds

- Deployments

#### Application Events

Application Events are a filtered view of the Organization Events that relate to a specific Application, they include:

- Environments

- Runbooks

- Pipeline Executions

- Builds

- Deployments

#### Environment Events

Environment Events relate to a specific Application Environment, they include:

- Deployments
