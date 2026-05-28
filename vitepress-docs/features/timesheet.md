---
title: Timesheet
description: Weekly time tracking with project allocation.
---

# Timesheet

`Timesheet.jsx` lets employees log hours per project per day, then submit a week for approval.

## UX Flow

### 1. Pick the week
Default is the current week. Navigate previous/next.

### 2. Fill hours per project per day
A grid with rows = projects, columns = Mon–Sun.

### 3. Submit
Locks the week and notifies the manager.

### 4. Manager review
Manager approves or sends back with comments.

## Validation Rules

- Total hours per day cannot exceed 24
- Total per week typically capped at 60 (configurable)
- At least one project row required to submit
- Submitted weeks are read-only unless manager re-opens them

## Source

`frontend/src/pages/Timesheet.jsx`

## Related

- [Projects](/features/projects)
- [Performance Reviews](/features/performance)
