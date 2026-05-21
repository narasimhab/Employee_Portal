-- Employee Portal Database Schema
-- Created for Phase 1 initialization

-- Create Database
CREATE DATABASE IF NOT EXISTS employee_portal;
USE employee_portal;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'manager', 'employee') DEFAULT 'employee',
  department_id INT,
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  status ENUM('active', 'inactive', 'on_leave') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_status (status)
);

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  manager_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (manager_id) REFERENCES users(id)
);

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  status ENUM('active', 'on_hold', 'completed', 'cancelled') DEFAULT 'active',
  start_date DATE,
  end_date DATE,
  manager_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (manager_id) REFERENCES users(id),
  INDEX idx_status (status)
);

-- Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT NOT NULL,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id),
  INDEX idx_created_at (created_at)
);

-- Leaves Table
CREATE TABLE IF NOT EXISTS leaves (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  leave_type ENUM('sick', 'vacation', 'personal', 'maternity', 'other') NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  reason TEXT,
  approver_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(id),
  FOREIGN KEY (approver_id) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_employee_id (employee_id)
);

-- Timesheets Table
CREATE TABLE IF NOT EXISTS timesheets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  date DATE NOT NULL,
  hours_worked DECIMAL(4, 2),
  project_id INT,
  notes TEXT,
  status ENUM('draft', 'submitted', 'approved') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(id),
  FOREIGN KEY (project_id) REFERENCES projects(id),
  UNIQUE KEY unique_entry (employee_id, date),
  INDEX idx_status (status)
);

-- Performance Reviews Table
CREATE TABLE IF NOT EXISTS performance_reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  rating DECIMAL(3, 2),
  comments TEXT,
  review_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(id),
  FOREIGN KEY (reviewer_id) REFERENCES users(id),
  INDEX idx_employee_id (employee_id)
);

-- Assets Table
CREATE TABLE IF NOT EXISTS assets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  asset_type VARCHAR(100) NOT NULL,
  asset_tag VARCHAR(100) UNIQUE NOT NULL,
  assigned_to INT,
  description TEXT,
  purchase_date DATE,
  status ENUM('active', 'inactive', 'damaged', 'lost') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  INDEX idx_status (status)
);

-- Policies Table
CREATE TABLE IF NOT EXISTS policies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT NOT NULL,
  category VARCHAR(100),
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category)
);

-- Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  certification_name VARCHAR(255) NOT NULL,
  issuing_organization VARCHAR(255),
  issue_date DATE,
  expiry_date DATE,
  credential_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(id),
  INDEX idx_employee_id (employee_id)
);

-- Surveys Table
CREATE TABLE IF NOT EXISTS surveys (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by INT NOT NULL,
  status ENUM('draft', 'active', 'closed') DEFAULT 'draft',
  start_date DATETIME,
  end_date DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_status (status)
);

-- Survey Responses Table
CREATE TABLE IF NOT EXISTS survey_responses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  survey_id INT NOT NULL,
  respondent_id INT NOT NULL,
  response_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (survey_id) REFERENCES surveys(id),
  FOREIGN KEY (respondent_id) REFERENCES users(id),
  UNIQUE KEY unique_response (survey_id, respondent_id)
);

-- Holidays Table
CREATE TABLE IF NOT EXISTS holidays (
  id INT PRIMARY KEY AUTO_INCREMENT,
  holiday_name VARCHAR(255) NOT NULL,
  holiday_date DATE NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  receipt_url VARCHAR(500),
  status ENUM('pending', 'approved', 'rejected', 'reimbursed') DEFAULT 'pending',
  submitted_date DATE,
  approver_id INT,
  approved_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(id),
  FOREIGN KEY (approver_id) REFERENCES users(id),
  INDEX idx_status (status),
  INDEX idx_employee_id (employee_id)
);

-- Rewards Table
CREATE TABLE IF NOT EXISTS rewards (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  reward_type VARCHAR(100),
  points INT,
  description TEXT,
  given_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(id),
  FOREIGN KEY (given_by) REFERENCES users(id),
  INDEX idx_employee_id (employee_id)
);

-- Org Chart (Hierarchical data - Employee relationships)
CREATE TABLE IF NOT EXISTS org_hierarchy (
  id INT PRIMARY KEY AUTO_INCREMENT,
  employee_id INT NOT NULL,
  manager_id INT,
  level INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (employee_id) REFERENCES users(id),
  FOREIGN KEY (manager_id) REFERENCES users(id),
  UNIQUE KEY unique_employee (employee_id)
);
