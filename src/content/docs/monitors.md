---
layout: ../../layouts/Layout.astro
title: Monitoring
description: How to observe your Applications and get notified when something is in alarm.
section: Reference
order: 5
---

# Monitors


Monitors are a tool for observing data recorded in Logs. Monitors run Log Metric Queries on an interval, they gather data and produce alarms when specified conditions are met. For example, Monitors can use Noop Traffic Logs to create an alarm when there are a higher than usual number of Application response status codes greater than 204.

The Monitors page can be found in the Organization menu. A new Monitor can be created by clicking "New Monitor" on the Organization menu or on the Monitors page. Choose from pre-defined Monitor templates to get started. Once a template is selected, the Monitor definition can be modified to suit your specific Application needs.

Monitors help developers identify and respond to Application problems. But, they can also produce alerts based on Application-specific business logic. When an Application logs JSON, the values of that JSON are queryable using Logic. For example, an ecommerce Application that fulfills orders could send an alert when product inventory is low. 

The status of a Monitor, is either `OK` or `in-alarm`. If the Monitor is `in-alarm` it could be the result of any of the possible alarm conditions set for the Monitor. For example, when we apply the Postgres health Monitor template, one possible alarm scenario is the instance is out of disk space. The `in-alarm` state will indicate the `OUT_OF_DISK` condition as the reason for the alarm state.



------------ ANNOUNCEMENT

Introducing Monitors, your essential tool for tracking log data. From the Organization menu, set up new Monitors and customize them to meet your application needs. Monitor logs for unusual response codes, Resource issues, and even your own business logic. Offering you the ability to anticipate and resolve application problems efficiently. Let's build!


------------ HELP

NOTE: each headline could be a summary of how to use the pre-defined template -- slighly different than how not to mess up using the feature, but maybe a good approach.

"Monitors" are tools that keep an eye on data, using Log Metric Queries to generate alarms when specified conditions occur. They can be found in the Organization menu and can be customized using templates for your application's specific needs.

Smooth Application Response
Potential issues may arise from an increase in Application response status codes over 204. Should this occur, promptly adjust application parameters or investigate for potential bugs to ensure smooth application operation.

Inventory Management
When your application logs JSON, inventory shortages can potentially trigger alarms. Actively monitoring these logs allows for timely inventory replenishment, preventing order fulfillment disruptions.

Ensuring Adequate Disk Space
The Monitor status switching to in-alarm might indicate your instance running out of disk space. Ensure you're actively managing storage resources to prevent disk space exhaustion, which could compromise the operation of your Monitor. Regular checks or automated systems can help maintain an OK state, guaranteeing the continuous and efficient operation of your system.
