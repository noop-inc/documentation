---
layout: ../../layouts/Layout.astro
title: Logs
description: Overview of Noop Log types and how to query them
section: Reference
order: 5
---

## Overview

Noop logs everything. From activity on Traffic Endpoints all the way down to the Service Instances, every piece of your Application is observable through the Logs.

Logs are accessible from the Noop Console. Each page has a panel showing the associated Log stream open to the live tail. It's possible to query the Log view to a specific date, time and content criteria (such as error conditions).

All Noop Logs are structured as JSON and can be queried with Noop Logic. When you output your own logs in JSON format, they also become queriable with Logic.

Noop also supports full-text search for all Logs.

### Filtering Logs

Log filtering is accessible under the hamburger menu icon in the top right corner of every Log panel. In the Log filter menu are options to search (using arbitrary text), select a date range, and apply filter Logic.

[IMAGE]

There's also a way to add filter Logic without manually writing the condition code. Select (by clicking) a Log entry with a property you want to apply to the filter. Hover over the property and click the hamburger icon to the left. Select "Filter logs by [PROPERTY NAME] value". The Logs will update to only include entries matching that value.

[IMAGE]

If you open the Log filter menu again you will see the Logic operator that was applied to filter the logs.

[IMAGE]

### Live Tailing

When viewing recent logs without specifying an end time, Noop will automatically tail and stream the log events to you.

## Log types

### Build Logs

A Noop Build is the build phase of every Component within an Application. Builds are accessible from the Application Dashboard page.

[IMAGE]

The Build Logs show the output of each Component build. Build logs can be filtered to an individual Component using the log filter function.

To filter Logs by a component click a line in the Log from the desired component. Hover over the "component" property and click the three stacked horizontal lines to the left.

[IMAGE]

Click "Filter logs by this Component value". This will update the log view to show only the Logs from that specific component.

### Traffic Endpoint Logs

Here you will see all requests to your public Endpoints. Each request to the Endpoint will show the request itself, the rule that handled the request, and the response.

The most common Traffic Log sequence will show `traffic.request`, `traffic.forward` and `traffic.response` Events. 

[IMAGE]

Traffic forward is the Event type indicating traffic sent to an Application Environment. See Traffic and Routing for details on how Traffic is resolved.

### Environment Logs

Environment Logs are an aggregate view of all Component output and Environment Traffic logs. Environment Logs are available on the Monitoring page.

[IMAGE]

From this view it's possible to filter Logs by a specific time range, Stack, Component, Instance or any other filter criteria available from the JSON output of the Logs themselves.

In addition to the high-level Environment Log view there are three other useful Log entry-points: Stacks, Components and Service Instance Logs. Each of these views is a filter of the top-level Environment Log. Note: it's possible to create the same filter of each of these views from the Monitoring page.

Opening the Log filter menu on each of these pages will show the exact filter that was applied to the Environment Logs.

#### Stack Logs

This is the aggregate view of logs from all Services and Tasks for a given Stack (a Stack is usually representative of a unique deployment).

This is useful to identify if an issue is related to a specific Deployment.

[IMAGE]

#### Stack Component Logs

All Logs of a Task or Service running within a Stack. Viewing component logs allows you to see all Component activity across the Instances of a Stack.

[IMAGE]

#### Service Instance Logs

The Task or Service Logs of a particular instance. Service Instance Logs are valuable to identify issues that are particular to a specific instance.

[IMAGE]

### Event Logs

Event Logs are intended to show an overview of activity across your Applications. Organization Events are the highest level and show all events down to the Environment level. Application and Environment Event streams are filtered views of the Organization. Below are event types available at each level.

#### Organization

Shows events related to the Organization, they include:

- Applications
- Endpoints
- Environments
- Runbooks
- Pipeline Executions
- Builds
- Deployments

#### Application

Application Events are a filtered view of the Organization Events that relate to a specific Application, they include:

- Environments
- Runbooks
- Pipeline Executions
- Builds
- Deployments

#### Environment

Environment Events relate to a specific Application Environment, they include:

- Deployments

