---
title: 'Filtering Logs'
description: 'How to review and filter Logs'
slug: 'filtering-logs'
section: 'core concepts'
layout: '../../layouts/Doc.astro'
pubDate: ''
order: 7
---

## Overview

See the [Logs docs](/docs/logs/) for documentation on the different types of Logs.

Log filtering is accessible under the hamburger menu icon in the top right corner of every Log panel. In the Log filter menu are options to search (using arbitrary text), select a date range, and apply filter Logic.

![Screenshot of panel showing Log event items](/assets/docs/imgs/90a4b574-a281-453c-bb6b-0201d32c9477.png)

There’s also a way to add filter Logic without manually writing the Logic condition code. Select (by clicking) a Log entry with a property you want to apply to the filter. Hover over the property and click the hamburger icon to the left. Select “Filter logs by [PROPERTY NAME] value”. The Logs will update to only include entries matching that value.

![Screenshot of link used to filter Logs by property](/assets/docs/imgs/0c3f5fd5-1ae9-4891-963f-8a7f17e66ba5.png)

Opening the Log filter menu again will show the Logic operator that was applied to filter the logs.

![Screenshot showing Log filter menu with Logic query applied to Log view.](/assets/docs/imgs/64488720-58d1-416f-9f88-cb2ca9bee36c.png)


## Filtering With Logic

Logic expressions used in the Log filter evaluate whether each Log entry matches the condition set in Logic. In other words, a Log entry will be fetched if the Logic expression evaluates truthy for that entry.

See the Logs documentation for more information on how to apply Logic conditions.

The following example matches all log entries where the **`level`** variable equals “error”.

```
equals:
  - var: level
  - error
```

**`level`** in the example above is a JSON property of the output Log entry. Any JSON property can be used to filter the logs, including properties set by the application itself.

Outputting structured JSON from application logs automatically produces Logs that are queryable from the Noop console.

NOTE: Not all Logic operators are available for Log filtering. See the [Logic reference](/docs/logic-reference/) for a complete list.

The context variable of Logs changes depending on the Log stream and also by custom properties set by application developers. 

