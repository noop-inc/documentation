---
layout: ../../layouts/Layout.astro
title: Deployments
description: Overview of how to create and manage Deployments
section: Reference
order: 5
---

Simply put, Deployments publish code and configuration changes to Noop Environments.

Deployments can be created manually from the Environment Dashboard in the Console, or triggered automatically using a Pipeline.

[PICTURES]

To create a Deployment manually, navigate to the appropriate Environment dashboard. In the left-hand panel, select "New Deployment" at the top of the recent Deployments list. Select the appropriate Build and continue following the Deployment instructions.

[PICTURES]

Deployments can also be triggered automatically via a Pipeline. A Pipeline creates a Deployment in response to Github repository events. To create a Pipeline, navigate to an Application dashboard, select "New Pipeline" at the top of the Pipeline executions list in the left-hand page panel. Follow the instructions in the Pipeline creation form.

All Deployments maintain 100% uptime using a blue-green deploy process. Here is how that works:

- When a Deployment starts, a **Green Stack** is created in the Environment with Traffic disabled.
- All **BeforeServices** Tasks are executed in the newly created **Green Stack**
- Then, all Services in the **Green Stack** are started, Noop waits for them to complete by observing their health checks.
- Once all Services are successfully started, the **BeforeTraffic** Tasks are executed in the **Green Stack**
- After the **BeforeTraffic** Tasks are complete, Traffic begins fowarding to the **Green Stack**
- Finally once all Traffic is drained from the **Blue Stack** (the previous deployment), it is destroyed.

## Rollbacks

In Noop, every Deployment is associated with a Build. Rolling back to an earlier release, involves creating a new Deployment, following the instructions above, referencing a prior build.

