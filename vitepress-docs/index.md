---
layout: home

hero:
  name: "CorpLink"
  text: "Employee Portal Docs"
  tagline: Full-stack employee management built with React, Node.js, and MySQL.
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: API Reference
      link: /api-reference/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/

features:
  - icon: 🚀
    title: Installation
    details: Get the frontend, backend, and database running in minutes.
    link: /getting-started/installation
  - icon: ⚡
    title: Quickstart
    details: Launch dev servers and log in with demo credentials.
    link: /getting-started/quickstart
  - icon: 🧩
    title: Architecture
    details: Understand how the React SPA, Express API, and MySQL fit together.
    link: /architecture/overview
  - icon: 🔌
    title: API Reference
    details: Browse REST endpoints exposed by the backend.
    link: /api-reference/introduction
  - icon: 🛡️
    title: Roles & Permissions
    details: Three roles (Admin / Manager / Employee) enforced front and back.
    link: /development/roles-and-permissions
  - icon: 🗄️
    title: Database
    details: 19 tables, sample data, and migration scripts.
    link: /development/database
---

## What's Inside

CorpLink ships with a feature-rich set of modules: **Dashboard**, **Employee Directory**, **Org Chart**, **Leave Management**, **Timesheets**, **Performance Reviews**, **Projects**, **Assets**, **Policies**, **Certifications**, **Surveys**, **Holidays**, **Expenses**, and **Rewards**.

## Tech Stack at a Glance

| Layer | Stack |
|-------|-------|
| **Frontend** | React 18 · Vite · Tailwind CSS · React Router · Axios |
| **Backend** | Node.js · Express · JWT · bcryptjs · Winston |
| **Database** | MySQL 8.0+ · 19 tables · seeded sample data |

::: tip Current Status
**Phase 2 — Authentication & User Management is COMPLETE.** Phase 3 (employee directory, leave, timesheet, performance reviews) is in progress.
:::

Continue to [Installation](/getting-started/installation) to set up your local environment.
