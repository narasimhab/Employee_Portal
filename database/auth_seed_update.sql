-- Update User Passwords for Demo Accounts
-- bcrypt (cost 10) for plain password: password123

USE employee_portal;

-- Update demo user passwords
UPDATE users SET password_hash = '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6' WHERE email = 'john.smith@company.com';
UPDATE users SET password_hash = '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6' WHERE email = 'sarah.johnson@company.com';
UPDATE users SET password_hash = '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6' WHERE email = 'michael.chen@company.com';
UPDATE users SET password_hash = '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6' WHERE email = 'emma.wilson@company.com';
UPDATE users SET password_hash = '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6' WHERE email = 'david.brown@company.com';
UPDATE users SET password_hash = '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6' WHERE email = 'lisa.davis@company.com';
UPDATE users SET password_hash = '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6' WHERE email = 'james.miller@company.com';
UPDATE users SET password_hash = '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6' WHERE email = 'jennifer.lee@company.com';
UPDATE users SET password_hash = '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6' WHERE email = 'daniel.kim@company.com';
UPDATE users SET password_hash = '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6' WHERE email = 'sophia.garcia@company.com';

-- Add avatar URLs
UPDATE users SET avatar_url = 'https://i.pravatar.cc/100?img=12' WHERE email = 'john.smith@company.com';
UPDATE users SET avatar_url = 'https://i.pravatar.cc/100?img=15' WHERE email = 'sarah.johnson@company.com';
UPDATE users SET avatar_url = 'https://i.pravatar.cc/100?img=8' WHERE email = 'michael.chen@company.com';
UPDATE users SET avatar_url = 'https://i.pravatar.cc/100?img=22' WHERE email = 'emma.wilson@company.com';
UPDATE users SET avatar_url = 'https://i.pravatar.cc/100?img=35' WHERE email = 'david.brown@company.com';
UPDATE users SET avatar_url = 'https://i.pravatar.cc/100?img=5' WHERE email = 'lisa.davis@company.com';
UPDATE users SET avatar_url = 'https://i.pravatar.cc/100?img=20' WHERE email = 'james.miller@company.com';
UPDATE users SET avatar_url = 'https://i.pravatar.cc/100?img=25' WHERE email = 'jennifer.lee@company.com';
UPDATE users SET avatar_url = 'https://i.pravatar.cc/100?img=33' WHERE email = 'daniel.kim@company.com';
UPDATE users SET avatar_url = 'https://i.pravatar.cc/100?img=40' WHERE email = 'sophia.garcia@company.com';

-- Verify updates
SELECT id, first_name, last_name, email, role FROM users LIMIT 10;
