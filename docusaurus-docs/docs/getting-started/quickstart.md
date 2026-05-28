---
sidebar_position: 2
title: Quickstart
description: Run CorpLink locally and log in with demo credentials in under 2 minutes.
---

# Quickstart

After completing [Installation](/docs/getting-started/installation), follow these steps to launch the app.

## Start the Servers

### 1. Start the backend

```bash
cd backend
npm run dev
```

Server starts on **http://localhost:3000**.

### 2. Start the frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

UI opens on **http://localhost:5173**.

### 3. Log in

Navigate to [http://localhost:5173/login](http://localhost:5173/login) and use one of the [demo accounts](/docs/getting-started/demo-credentials).

## Verify Everything Works

<details>
<summary>Health check passes</summary>

```bash
curl http://localhost:3000/api/health
```
Returns `{ "success": true, "message": "API is running" }`

</details>

<details>
<summary>Login returns a token</summary>

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john.smith@company.com","password":"password123"}'
```

</details>

<details>
<summary>Dashboard loads with data</summary>

After login, the dashboard should display user stats, recent announcements, and project counts.

</details>

## What's Next?

| | |
|---|---|
| 🧩 [Explore Features](/docs/features/dashboard) | Tour each feature module. |
| 🔌 [API Reference](/docs/api-reference/introduction) | Hit the backend with curl or Postman. |
| 📐 [Architecture](/docs/architecture/overview) | Understand how the pieces fit. |
| 🛡️ [Roles](/docs/development/roles-and-permissions) | Admin vs Manager vs Employee access. |
