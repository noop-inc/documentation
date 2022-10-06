# Deployments

Deployments are the main way to rollout your code and configuration changes to an [Environment](/docs/Environments.md). They take advantage of [Stacks](/docs/Stacks.md) to run multiple instances of your NoopApp concurrently in the same Environment while controlling [Traffic](/docs/Traffic.md) between them. Only one Deployment can be in progress at a time for an Environment.

## Default Workflow

Our default Deployment [Workflow](/docs/Workflows.md) simply brings up your new code in new components, moves traffic over to it, and then destroys the old components that were running (aka blue/green). Here's a little more detail on what happens during a Deployment...

- We create a new **Green Stack** in the Environment with [Scaling](/docs/Components.md#scaling) & [Traffic](/docs/Stacks.md#traffic) disabled.
- All **BeforeServices** [Lifecycle Tasks](/docs/Applications.md#lifecycles) are executed in **Green Stack**
- A [Scaling Adjustment](/docs/Stacks.md#scaling-adjustments) launches all [Services](/docs/Components.md#services) in **Green Stack** and waits for them to complete [Health Checks](/docs/Components.md#health-checks)
- All **BeforeTraffic** [Lifecycle Tasks](/docs/Applications.md#services-lifecycles) are executed in **Green Stack**
- [Traffic](/docs/Stacks.md#traffic) is enabled to the **Green Stack**
- Finally, the **Blue Stack** that was running previously, is destroyed once Traffic is drained
