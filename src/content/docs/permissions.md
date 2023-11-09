---
title: 'Permissions'
description: 'Controlling what Users and Teams can do within the Noop Console'
slug: 'permissions'
section: 'core concepts'
layout: '../../layouts/Doc.astro'
pubDate: ''
order: 8
---

Permissions control which Users can do what within an Organization. All User actions, including viewing pages within Noop, are associated with a Grant. When the User has a Grant, they can perform the associated action.

Permissions are associated with individual Users and Teams. When a user is a member of a Team, they inherit the Team Permission settings.

Teams are created from the People and Teams page, accessible from the Organization Menu.

![Screenshot showing the People and Teams page with the Create New Team form open](/assets/docs/imgs/29b10fa5-7d45-4511-b107-00ddfd95b1ef.png)

On the Organization, Application and Environment settings pages Permissions can be granted to a Team or User. In order for a User to assign a Grant, they themselves must have appropriate Permission to do so.

![Screenshot showing how to access the Permissions settings for an Organization](/assets/docs/imgs/96d41c4a-c523-42d2-9358-f822512d6c1f.png)

A User that has the "Grants" Grant, can modify any of their own or others' Permissions.

Permissions are inherited from the Organization level down to the Environment. For example, if a user has a Grant for "initiating deployments" at the Organization level, they will be allowed to initiate deployments on \*\*all\*\* Environments within that Organization. Likewise, a Grant for initiating Deployments at the Application level will allow the User or Team to initiate Deployments in all Environments within that Application.

By allowing all Grants at the Organization level a User will have complete access to all operations within that Org.

Teams can be created to allow access to specific Application functions for groups of Users. The "People and Teams" page available from within the Organization menu is where Users can be added to or removed from Teams.
