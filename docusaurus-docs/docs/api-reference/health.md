---
sidebar_position: 2
title: Health Check
description: Liveness endpoint to verify the API is running.
---

# Health Check

`GET /api/health`

A simple unauthenticated endpoint for uptime monitoring and CI smoke tests.

## Request

```bash
curl http://localhost:3000/api/health
```

No headers, no body, no auth required.

## Response

```json
// 200 OK
{
  "success": true,
  "message": "API is running"
}
```

## Source

From `backend/src/routes/health.js`:

```js
router.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' })
})
```

:::tip
Use this for liveness probes in Kubernetes, ALB target group health checks, or `wait-for-it.sh` scripts.
:::
