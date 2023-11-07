---

title: "Amazon S3"
description: "Adding block storage to Noop Applications using Amazon S3"
slug: "amazon-s3"
section: "resources"
layout: "../../layouts/Doc.astro"
pubDate: ""
order: 19

---

Noop provides an Amazon S3 Resource to associate block storage with your application Components. [Amazon S3](https://aws.amazon.com/pm/serv-s3/) is “object storage built to store and retrieve any amount of data from anywhere”.

## Usage

To create an S3 bucket on Noop, add it to your Application Manifest (app.yml) under the resources property. Specify the type as \`s3\` and include an alphanumeric name. The name is used to reference the resource from Application Components.

Here’s a complete app.yml example:

```
components:
  - name: ExampleService
    type: service
    image: node:alpine
    runtime:
      resources:
        - S3Bucket
      variables:
           S3_BUCKET:
             $resources: S3Bucket.bucket
           S3_ENDPOINT:
             $resources: S3Bucket.endpoint
resources:
 - name: S3Bucket
   type: s3
```

When an S3 resource is connected to an Application Component the following dynamic variables are available to use within the app.yml `components.[n].runtime` property:

- `endpoint`

- `bucket`

To reference a resource property use the special `$resource` key. See the following example:

```
components:  
  - ...
    runtime:
      resources:
        - S3Bucket
      variables:
           S3_ENDPOINT:
             $resources: S3Bucket.endpoint
```

As with all Noop resources, the Resource Explorer allows you to browse all data stored in the S3 bucket. The resource explorer is available on the S3 resource page within the Noop console.

**Note**: the bucket is not accessible from the public internet.
