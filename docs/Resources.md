# Resources

Resources handle the persistent, stateful needs of your code. While [Components]() come and go as your code changes, Resources persist in your [Environment]().

## S3 Buckets
```yaml
resources:
  - name: ImagesBucket
    type: s3
```

## DynamoDB Tables
```yaml
resources:
  - name: Customers
    type: dynamodb
    hashKeyName: customerId
    hashKeyType: S
```

## MySQL Databases
```yaml
resources:
  - name: Inventory
    type: mysql
```

## PostgreSQL Databases
```yaml
resources:
  - name: Orders
    type: postgresql
```