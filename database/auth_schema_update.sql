-- User Sessions Table (for authentication tracking)
-- Run this to add session management to the database

USE employee_portal;

-- Create user_sessions table
CREATE TABLE IF NOT EXISTS user_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  token_hash VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent VARCHAR(500),
  expires_at DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_expires_at (expires_at)
);

-- Create roles table for future role management
CREATE TABLE IF NOT EXISTS roles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  role_name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  permissions JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default roles with permissions
INSERT INTO roles (role_name, description, permissions) VALUES
('admin', 'Administrator with full access', JSON_ARRAY('view_all', 'edit_all', 'delete_all', 'manage_users', 'manage_roles')),
('manager', 'Manager with team oversight', JSON_ARRAY('view_team', 'edit_team', 'approve_requests', 'view_reports')),
('employee', 'Regular employee with basic access', JSON_ARRAY('view_own', 'edit_own', 'submit_requests'));

-- Update users table to add avatar_url if not exists
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url VARCHAR(500);

-- Add audit log table for tracking changes
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  action VARCHAR(100),
  entity_type VARCHAR(100),
  entity_id INT,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);
