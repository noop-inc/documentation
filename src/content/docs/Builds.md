# Builds

A Build is an artifact of your [Component](/docs/Components.md) Source Code that has been processed through your own [Build Steps](#build-steps).

## Build Steps

You can define any compilation, packaging, or testing steps for your Components within the [AppManifest](/docs/Manifests.md#appmanifest).

### Run Step

Execute a command.

```yaml
steps:
  - run: npm ci
```

### Copy Step

Copy files from your source code into the current directory.

```yaml
steps:
  - copy: package.json
  - copy: *
```

### Directory Step

Set the current working directory.

```yaml
steps:
  - directory: /build
```

## Source Code

Source Code represents a discreet version of your code that has been indexed and archived by Noop.
