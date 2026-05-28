---
sidebar_position: 1
title: Phase 1 — Project Setup
description: Initial scaffold of frontend, backend, and database.
---

# Phase 1 — Project Setup

:::info
This page summarizes Phase 1. The full long-form notes live in `docs/PHASE1_SETUP.md` at the repo root.
:::

## Status: ✅ Complete

### Frontend
- React app scaffolded with Vite
- Tailwind CSS configured
- React Router with 15 page routes
- Axios HTTP client
- Theme tokens and Layout component
- Page templates for all routes

### Backend
- Node.js + Express app
- `.env` configuration via dotenv
- MySQL connection pool with `mysql2`
- API structure (`routes` → `controllers` → `models`)
- Middleware: `auth`, `errorHandler`, `requestLogger`, `validate`
- Winston logging
- `/api/health` and `/api/dashboard` endpoints

### Database
- Schema with 16 tables
- Seeded with 10 users, 6 departments, 5 projects
- Proper indexing and foreign keys

## Deliverables

| File | Purpose |
|------|---------|
| `frontend/package.json` | Frontend deps |
| `frontend/vite.config.js` | Build config |
| `frontend/tailwind.config.js` | Design tokens |
| `backend/package.json` | Backend deps |
| `backend/src/server.js` | Express entry |
| `database/schema.sql` | DDL for 16 tables |
| `database/seed.sql` | Sample data |

## What's Next

Continue to [Phase 2 — Authentication](/docs/phase-guides/phase-2-authentication).
