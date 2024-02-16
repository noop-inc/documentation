---
layout: ../../layouts/Doc.astro
title: Stacks
slug: 'stacks'
description: Organizing distinct running instances of an Application
section: 'core concepts'
order: 5
---

A Stack is an instance of an Application Environment and is composed of the Application's Components. A stack can either be "active" meaning it is running, or "inactive" meaning it is no longer running. In other words an "active" Stack is the running software of a specific Deployment.

Stacks are created automatically when a Build is Deployed.

Stacks have two primary functions. First, they provede a separation between two different versions of an Application. Separate running versions of an app are especially useful for Deployments. In all Noop Deployments, the current "active" Stack continues to serve traffic until the new Stack is finished deploying. This allows Noop to transfer Traffic from the old to the new Stack without any interruption of service (blue/green deployments). 

The second purpose of a Stack is simply to create a group of all Environments Components. By associating all Application Components with a unique Stack ID, developers can observe and analyze the Logs of a particular Stack without confusing them with others.

The Services and Tasks for a particular Stack contain their associated container Instances. When a container Instance is running, it can be connected to with a Terminal, directly from the Noop Console. However, it's possible for container instances to be destroyed and recreated in the course of running an "active" Stack.

