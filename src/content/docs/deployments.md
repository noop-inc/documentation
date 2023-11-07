---

title: "Deployments"
description: "How to create and manage Deployments"
slug: "deployments"
section: "core concepts"
layout: "../../layouts/Doc.astro"
pubDate: ""
order: 11

---

Simply put, Deployments publish code and configuration changes to Noop Environments.

Deployments can be created manually from the Environment Dashboard in the Console, or triggered automatically using a Pipeline.

To create a Deployment manually, navigate to the appropriate Environment dashboard. In the left-hand panel, select “New Deployment” at the top of the recent Deployments list. Select the appropriate Build and continue following the Deployment instructions.

![Screenshot showing the Environment overview panel including the new Deployment button](/assets/docs/imgs/3c093da5-3e62-4c4b-8923-820d537d62b9.png)

![Screenshot showing the Build selection modal.](/assets/docs/imgs/402c8a6f-79e8-4812-b588-5bc08b7ce191.png)

Deployments can also be triggered automatically via a Pipeline. A Pipeline creates a Deployment in response to Github repository events. To create a Pipeline, navigate to an Application dashboard, select “New Pipeline” at the top of the Pipeline executions list in the left-hand page panel. Follow the instructions in the Pipeline creation form.

![Screenshot of Application overview panel, including button to create new Pipeline.](/assets/docs/imgs/5f0d3e92-d981-48e5-a243-72d53c077127.png)

All Deployments maintain 100% uptime using a blue-green deploy process. Here is how that works:

- When a Deployment starts, a **Green Stack** is created in the Environment with Traffic disabled.

- All **BeforeServices** Tasks are executed in the newly created **Green Stack**

- Then, all Services in the **Green Stack** are started, Noop waits for them to complete by observing their health checks.

- Once all Services are successfully started, the **BeforeTraffic** Tasks are executed in the **Green Stack**

- After the **BeforeTraffic** Tasks are complete, Traffic begins fowarding to the **Green Stack**

- Finally once all Traffic is drained from the **Blue Stack** (the previous deployment), it is destroyed.

## Rollbacks

In Noop, every Deployment is associated with a Build. Rolling back to an earlier release, involves creating a new Deployment, following the instructions above, referencing a prior build.
