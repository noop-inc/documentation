---

title: "Pipelines"
description: "How to run CI/CD Workflows in response to Source Repository events"
slug: "pipelines"
section: "core concepts"
layout: "../../layouts/Doc.astro"
pubDate: ""
order: 12

---

Pipelines run an operational procedure called a Workflow. The Pipeline Workflow is triggered in response to Repository events (Activity in Github).

Typically a Pipeline is used to deploy code to an environment. The Deployment can be triggered by pushing to a specific branch, publishing a release, or any other event-type supported by Github.

Pipelines are created from the Noop Console on the Application Dashboard. In the left-hand panel, click “Add Pipeline” and choose from the various templates. Complete the form with the necessary configuration. Submitting the form will activate the Pipeline.

![](/assets/docs/imgs/857ae3b7-8209-43dd-8e67-a24ae5974045.png)

![Screenshot showing the create Pipeline form.](/assets/docs/imgs/47d18f57-f063-4e5c-9f36-0e692f15ad95.png)

The Workflow that is run in response to the Repository event can perform many operational tasks including: creating a Build artifact from source, running integration tests, running bootstrap scripts, performing static code analysis, and of course deploying code. Workflows can handle any continuous integration and delivery (CI/CD) operation.

## Templates

Several Pipeline templates are available to accommodate common CI/CD patterns

- Build All Pushed Code

- Build & Deploy on Branch Push

- Build & Deploy on Tag Push

- Ephemeral Pull Request Environments

Once created, the Pipeline Workflow and condition can be modified from the Pipeline Settings page.

![Screenshot showing the Pipeline settings page and the menu dropdown used to access the settings.](/assets/docs/imgs/fdd100ad-0860-4dd5-8547-876f565baf12.png)

## Conditions

Pipelines execute when their **`condition`** property evaluates *truthy*. The **`condition`** property is evaluated as Logic and has a **`$repoevent`** context. The **`$repoevent`** context includes all of the **[Github webhook data](https://docs.github.com/en/webhooks/webhook-events-and-payloads)** Noop receives when code is pushed to Github.

Logic provides a way to respond to user-defined conventions derived from the Github event payload. For example, different Pipelines can be executed in response to different formatting in a repository tag. When Source code includes a “pre-release” tag, a Build and Deployment could be triggered for a “Staging” environment.
