---
title: Database
description: MySQL schema, seeding, and migration scripts.
---

# Database

CorpLink uses **MySQL 8.0+** with a normalized schema of **19 tables**.

## Setup Order

Run these in order from the repo root:

### 1. Base schema (16 tables)

```bash
mysql -u root -p < database/schema.sql
```

### 2. Auth schema (3 tables)

```bash
mysql -u root -p employee_portal < database/auth_schema_update.sql
```

Adds `user_sessions`, `roles`, and `audit_logs`.

### 3. Sample data

```bash
mysql -u root -p employee_portal < database/seed.sql
```

Inserts 10 users, 6 departments, 5 projects, plus related records.

### 4. Hashed demo passwords

```bash
mysql -u root -p employee_portal < database/auth_seed_update.sql
```

Updates demo accounts to bcrypt-hashed passwords.

## Table Inventory

::: details Identity & Auth (5 tables)
- `users` — primary user records, includes bcrypt password hash
- `roles` — admin, manager, employee role definitions
- `user_sessions` — active JWT sessions (server-side audit)
- `audit_logs` — login attempts, password changes, etc.
- `org_hierarchy` — manager → report relationships
:::

::: details Organization (3 tables)
- `departments`
- `projects`
- `holidays`
:::

::: details HR Workflows (5 tables)
- `leaves`
- `timesheets`
- `performance_reviews`
- `expenses`
- `certifications`
:::

::: details Engagement (4 tables)
- `announcements`
- `policies`
- `surveys`
- `survey_responses`
:::

::: details Operations (2 tables)
- `assets`
- `rewards`
:::

## Connection Pool

The backend uses a shared `mysql2` pool configured in `backend/src/config/`. This avoids opening a new TCP connection per request and gives predictable concurrency under load.

```js
import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
})
```

## Resetting the Database

```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS employee_portal;"
# then re-run the 4 setup steps above
```
