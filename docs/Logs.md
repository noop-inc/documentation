# Logs

Logs within Noop are grouped by broad contexts, like [Environments](/docs/Environments.md) or [Traffic Endpoints](/docs/Traffic.md) and are easily queryable down to your interest.

## Querying

All our logs are JSON structured and can be queried with [Noop Logic](/docs/Logic.md). If your Components output their logs in JSON, you can query their contents as well. Noop also supports full-text searching of all logs.

## Live Tailing

When viewing recent logs without specifying an end time, Noop will automatically tail and stream the log events to you.
