-- Instructions for Setting Up the Database

-- Step 1: Create the database schema
-- Run this command in MySQL:
-- mysql -u root -p < schema.sql

-- Step 2: Seed initial data
-- Run this command in MySQL:
-- mysql -u root -p employee_portal < seed.sql

-- Step 3: Verify Installation
-- Connect to the database:
-- mysql -u root -p employee_portal

-- Step 4: Check tables
-- SHOW TABLES;

-- Step 5: Verify data
-- SELECT COUNT(*) as total_users FROM users;
-- SELECT COUNT(*) as total_projects FROM projects;
-- SELECT COUNT(*) as total_departments FROM departments;

-- Notes:
-- - Update the password hashes with bcrypt hashed passwords before production
-- - Ensure MySQL is running and accessible
-- - Update database credentials in backend .env file
