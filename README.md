# Project README

Welcome to the **Employee Portal (CorpLink)** - a comprehensive employee management system built with modern web technologies.

## Overview

CorpLink is a full-stack web application designed to streamline employee management, project tracking, performance reviews, and organizational communication. Built with React, Node.js, and MySQL, it provides a seamless experience for managing all aspects of employee operations.

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MySQL** - Relational database
- **JWT** - Authentication
- **Winston** - Logging

### Development Tools
- **npm** - Package management
- **Nodemon** - Development server auto-restart
- **ESLint** - Code linting

## Features

### Phase 1 - Project Initialization ✅
- [x] Frontend setup with Vite & React
- [x] Tailwind CSS configuration
- [x] React Router setup
- [x] Axios HTTP client configuration
- [x] Backend server with Express
- [x] MySQL database schema
- [x] Sample data and seed script
- [x] Authentication middleware
- [x] Error handling
- [x] Logging system

### Phase 2 - Authentication & User Management ✅
- [x] Secure login system with JWT
- [x] Role-based access control (Admin, Manager, Employee)
- [x] Protected routes and pages
- [x] User session management
- [x] Logout functionality
- [x] Change password endpoint
- [x] User profile endpoint
- [x] Demo credentials for testing
- [x] Audit logging

### Upcoming Features (Phase 3+)
- Employee directory
- Leave management system
- Timesheet tracking
- Performance reviews
- Project management
- Announcements and communications
- Asset management
- Expense tracking
- Survey system
- Rewards and recognition

## Quick Start

### Prerequisites
- Node.js v18+
- MySQL 8.0+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd employee-portal
```

2. **Setup Frontend**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

3. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

4. **Setup Database**
```bash
# Create schema and tables
mysql -u root -p < database/schema.sql

# Add authentication tables
mysql -u root -p employee_portal < database/auth_schema_update.sql

# Seed sample data
mysql -u root -p employee_portal < database/seed.sql

# Update demo account passwords
mysql -u root -p employee_portal < database/auth_seed_update.sql
```

### Access the Application

**Frontend:** http://localhost:5173
**Backend API:** http://localhost:3000

### Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | john.smith@company.com | password123 |
| Manager | sarah.johnson@company.com | password123 |
| Employee | michael.chen@company.com | password123 |

## File Structure

```
├── frontend/              # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
├── backend/               # Express server
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── database/              # Database files
│   ├── schema.sql
│   └── seed.sql
└── docs/                  # Documentation
```

## API Endpoints

### Health Check
```
GET /api/health
```

### Authentication
```
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET /api/auth/profile - Get user profile
POST /api/auth/change-password - Change password
```

### Dashboard
```
GET /api/dashboard/stats - Get dashboard statistics
GET /api/dashboard/announcements - Get announcements
```

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=CorpLink
VITE_APP_VERSION=1.0.0
```

### Backend (.env)
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=employee_portal
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug
```

## Development

### Start Development Servers

Terminal 1 - Frontend:
```bash
cd frontend && npm run dev
```

Terminal 2 - Backend:
```bash
cd backend && npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:3000

## Database

### Tables
- users
- departments
- projects
- announcements
- leaves
- timesheets
- performance_reviews
- assets
- policies
- certifications
- surveys
- survey_responses
- holidays
- expenses
- rewards
- org_hierarchy

### Sample Data
The database includes 10 sample users, 6 departments, 5 projects, and various related records for testing.

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

All rights reserved. CorpLink © 2024

## Support

For issues or questions, please refer to:
- [Phase 1 Setup Guide](./docs/PHASE1_SETUP.md)
- [Database Documentation](./database/README.md)

---

**Current Status:** Phase 1 - Initial Setup Complete ✅
**Next Release:** Phase 2 - User Authentication & Core Features
