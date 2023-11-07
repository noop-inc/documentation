---
layout: ../../layouts/Layout.astro
title: Quick Start Guide
description: Get up and running on Noop in 5 minutes
section: Guides
order: 1
---


# Quick Start Guide

There are two different ways to quickly get up and running with Noop. You can download [Noop Desktop](https://noop.dev/download) (available on Mac, Linux, and Windows) to start developing and running NoopApps.

## The NoopApp

We use the term "NoopApp" to describe application source code configured to run using the [Noop Application Model](/docs/Applications.md#noop-application-model). Primarily, this requires describing your application with a [AppManifest](/docs/Manifests.md#appmanifest) in your source code at `.noop/app.yml`.

## Blueprints

We offer an ever-expanding library of sample NoopApps to get you started right away. You can easily run them as they are, or fork them to use as boilerplate and get hacking.

### Todo Sample

[noop-inc/blueprint-sample-todo](https://github.com/noop-inc/blueprint-sample-todo)

A simple SPA frontend in ReactJS and Express NodeJS API backend. It leverages a DynamoDB Table for storing database records and an S3 Bucket for storing uploaded assets.

## Developing with Noop Desktop

Blueprints are a great way to get started experiencing **development** of NoopApps. [Noop Desktop](https://noop.dev/download) is a complete local runtime for NoopApps as well as a full Cloud Console. Once you have Noop Desktop running, clone the Blueprint your want and navigate to **Local Devlopment -> New Project** and select the cloned directory.

## Running on Noop Cloud

Getting started with a Blueprint is a fast and easy way to jump into exploring the benefits of **running** NoopApps. After logging into the Console, navigate to **Cloud Services -> Your Organization -> New Application**. From there, select the **Noop Blueprints** option and follow through to launch it on Noop Cloud.
