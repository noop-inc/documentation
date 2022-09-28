# Deployments

Deployments are the main way to rollout your code in an Environment.

## Default Workflow

We follow a **blue-green** workflow for Deployments generally goes like...

- Create New Green Stack in the Environment with Traffic disabled
- Launch Green Components and wait for Health Verification
- Enable Green Stack Traffic
- Destroy Blue Stack
