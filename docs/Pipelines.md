# Pipelines

Pipelines enable you to run [Workflows](/docs/Workflows.md) in response to [Repository Events](/docs/Applications.md#linked-repositories). This includes continuous integration and delivery (CI/CD) as well as so much more. They are a great way to have Noop automatically respond to changes in your [Source Code](/docs/Builds.md#source-code)

## Templates

We offer several Pipeline Templates to get you started right away.

- Build All Pushed Code
- Build & Deploy on Branch Push
- Build & Deploy on Tag Push
- Ephemeral Pull Request Environments

## Conditions

You can express a condition in [Noop Logic](/docs/Logic.md) that is tested against every Repository Event received for your Application. Conditions might include certain events, like pushes, or specific code branches.
