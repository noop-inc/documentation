---
title: 'Terminals'
description: 'Starting a Terminal on a running Service Container'
slug: 'terminals'
section: 'core concepts'
layout: '../../layouts/Doc.astro'
pubDate: ''
order: 14
---


Every Service Instance on Noop is accessible via a Terminal session. Terminals can be used to debug running servers, gather information, run tests or whatever one-off manual system intervention is necessary.

![Noop Terminal Session](/assets/docs/imgs/terminal.png)

Terminals are accessible from the individual Service Instance page. To get to the Instance page:

- Navigate to the appropriate Environment dashboard and select the running Stack located in the top-level menu bar and also in the left-hand Environment overview panel. 
- Select the target Service Component
- Finally, select the individual Instance from the Service Instances list (depending on Environment configuration there could be one or more instances).

Once on the target Instance page, press the "Start Remote Terminal Session" button. The button will launch a Terminal panel, logged in as the `root` user.

Keep in mind that Terminals are attaching to Services deployed and running an Application. It's possible for them to be destroyed in the standard course of resolving scaling requirements.
