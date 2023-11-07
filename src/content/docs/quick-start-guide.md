---

title: "Quick Start Guide"
description: ""
slug: "quick-start-guide"
section: "getting started"
layout: "../../layouts/Doc.astro"
pubDate: ""
order: 2

---

## Overview

The fastest way to get started on Noop is to use one of our pre-configured Blueprints. This guide will walk through the process of launching a Node.js application with a Vue.js frontend and a Node API backend.

The Application will include an Amazon Dynamo table for data storage and Amazon S3 for image storage.

## Create the Application

Navigate to your organization page listed under Organizations on the main page of your Noop console.

![](/assets/docs/imgs/2fd825c3-8753-4718-bb0a-227679a8dc23.png)

Once on the Organization page, create a new Application using the button shown below.

![](/assets/docs/imgs/c3dba49f-9f81-452a-a3ed-422f8e28b684.png)

Select the "Sample Todo NodeJS, Vue" Blueprint under the Blueprints tab.

![](/assets/docs/imgs/7418379f-2f43-42ec-8bc8-64048abfc230.png)

Give the Application a name and optional description.

![](/assets/docs/imgs/654fe551-f6f9-4010-8a11-28353c57bc54.png)

Once that's done we'll execute a Runbook to automatically create an Environment, required resources, and an endpoint to access your Application from the internet.

Specify an Environment name and click "Execute Runbook".

![](/assets/docs/imgs/7bd87709-f7c5-44db-a29f-2196deadee1c.png)

After the Runbook is done, click the "Go to Application" button.

![](/assets/docs/imgs/e6072e09-8e32-4ece-b8fc-634d65adbbc0.png)

On the Application page you will see an overview of the activity that just took place. Note the specified environment has been created, a repository is linked, a build is completed. And in the logs you will also see a deployment has executed.

![](/assets/docs/imgs/526c7184-e633-4494-ad55-55843b07bba8.png)

## View the Application

In addition to all that you can find the internet Endpoint for your application listed under the Organization menu located in the Console header.

![](/assets/docs/imgs/c60949ce-4ee6-471a-adcf-5c1223d335e5.png)

And voila, your app is live!

![](/assets/docs/imgs/7cf3a467-1ada-4b78-a601-f23dd983a9bb.png)

## Next steps

The above example is great, but there are a couple flaws. For one thing you don't have control over the Github repository. The remainder of this guide will show you how to take ownership of the repository and deploy the Application whenever code is pushed to the main branch on Github.

### Create a source repository

First we'll import the project to your own GitHub account. Go to the [import repository page ](https://github.com/new/import)and use the Noop repo as the clone URL (<https://github.com/noop-inc/blueprint-todo-nodejs-vue>). Give the repo any name you want and click "Begin import".

![](/assets/docs/imgs/146c83ea-d39d-4232-8a70-a06d562fee9d.png)

Back on the Application page on the Noop console click the "Change Repo".

![](/assets/docs/imgs/f605e788-4e0f-4f0d-bff6-d8c5dbefcdd0.png)

Select the newly created repository under the "My Repositories" tab.

![](/assets/docs/imgs/20dbd3b5-fc8c-4a3f-b43a-6748bc224a46.png)

### Set up a deployment Pipeline

Now that your repo is connected we can set up the CI/CD Workflow. Click "New Pipeline".

![](/assets/docs/imgs/7bb1152a-84f6-48e6-ad23-2ac12b27c38a.png)

This guide will cover the "Build & Deploy on Branch Push". Select and click the blue button.

![](/assets/docs/imgs/26c71255-a81e-446f-885f-22d9a0acc47c.png)

The default options are all good, but feel free to change to suit your needs.

![](/assets/docs/imgs/a623394a-c61f-4e14-a46d-11b61e85602d.png)

Select the branch name and the target Environment created earlier.

![](/assets/docs/imgs/6d37e957-7f2e-4afb-9414-c8677c38fd14.png)

That's it. Once created the navigate to the Pipeline via the Application overview page.

After committing and pushing code to the new repository you will see a new Pipeline Execution.

![](/assets/docs/imgs/7a4b1468-7c9d-4527-b3e3-3c659b6e16cb.png)

The process for the pipeline is available on the Pipeline page.

![](/assets/docs/imgs/a75b6e6a-2675-4643-a1aa-ca76289e968a.png)

At this point you should see your latest changes on the Endpoint created earlier.
