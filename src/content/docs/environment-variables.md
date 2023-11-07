---
layout: ../../layouts/Layout.astro
title: Variables and Secrets
description: How to create and manage environment variables.
section: Reference
order: 5
---

Environment Variables can be defined in a number of ways. Which method to use to create a Variable depends on whether the Variable is a Secret. If the Variable contains sensitive data that needs to be kept private and secure, define a [Secret](#secrets) in the Noop Console Environment settings page.


## Standard Variables

When a variable does not need to be secret it can be included directly in the Application Manifest (app.yml). If the variable is the same across all Environments create a static variable definition like the LOG_LEVEL example here:

```yaml
components:
 - name: ExampleService
   type: service
   image: node:alpine
   runtime:
     command: npm start
     variables:
       LOG_LEVEL: info
```

When a variable needs to change based on environment or other application criteria, define it using Logic. Here is an example that changes the value of the LOG_LEVEL variable based on whether the environment is set to production:

```yaml
components:
 - name: ExampleService
   type: service
   image: node:alpine
   runtime:
     command: npm start
     variables:
       LOG_LEVEL: $env
         if: 
- var: production
           - warn
           - info
```

Noop can also reference dynamic Variables from Resource properties. Using Resource properties is useful when you need to connect a Service or Task Component to the Resource.  Here is an example of a service that uses a Redis Resource and surfaces the URL as a Variable in the Service runtime:


```yaml
components:
 - name: ExampleService
   type: service
   image: node:alpine
   runtime:
     resources:
       - ExampleCache
     variables:
       dbUrl: $resources.ExampleCache.url
resources:
 - name: ExampleCache
   type: redis
```

Variables can also be defined through the Noop Console on the Environment settings page. The Variable, name value and Component are specified using the form. This is the same form used to create a [Secret](#secrets).

## Secrets

Noop Secrets are a special type of Variable, the contents of which are encrypted. The variable is only decrypted by authorized Components. In addition, Noop protects these variables from exposure in the Console and Logs by masking the variable contents.

If a secret is accidentally logged its value will show as `***SECRET***`.

To create a Secret go to the Environment settings page and select the Variables section. Fill out the form as you would for a standard Variable and click on the lock-icon button. Toggling the lock icon indicates to Noop that the Variable should be a Secret.
