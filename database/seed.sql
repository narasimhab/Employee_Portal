-- Seed data for Employee Portal
-- This script populates initial test data

USE employee_portal;

-- Insert sample departments
INSERT INTO departments (name, description) VALUES
('Engineering', 'Software Development and Infrastructure'),
('Sales', 'Business Development and Client Relations'),
('Marketing', 'Brand and Digital Marketing'),
('Human Resources', 'People Management and Recruitment'),
('Finance', 'Financial Planning and Accounting'),
('Operations', 'Process Management and Administration');

-- Insert sample users (bcrypt hash of plain text password: password123)
INSERT INTO users (first_name, last_name, email, password_hash, role, department_id, phone, status) VALUES
('John', 'Smith', 'john.smith@company.com', '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6', 'admin', 1, '+1234567890', 'active'),
('Sarah', 'Johnson', 'sarah.johnson@company.com', '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6', 'manager', 1, '+1234567891', 'active'),
('Michael', 'Chen', 'michael.chen@company.com', '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6', 'employee', 1, '+1234567892', 'active'),
('Emma', 'Wilson', 'emma.wilson@company.com', '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6', 'manager', 2, '+1234567893', 'active'),
('David', 'Brown', 'david.brown@company.com', '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6', 'employee', 2, '+1234567894', 'active'),
('Lisa', 'Davis', 'lisa.davis@company.com', '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6', 'manager', 3, '+1234567895', 'active'),
('James', 'Miller', 'james.miller@company.com', '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6', 'employee', 3, '+1234567896', 'active'),
('Jennifer', 'Lee', 'jennifer.lee@company.com', '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6', 'manager', 4, '+1234567897', 'active'),
('Daniel', 'Kim', 'daniel.kim@company.com', '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6', 'manager', 5, '+1234567898', 'active'),
('Sophia', 'Garcia', 'sophia.garcia@company.com', '$2a$10$cti5o1XYKlWymq.Y9zsqNOQfrPnfF7cGqWq4dgKEvxJ0lP.ASBrm6', 'employee', 4, '+1234567899', 'active');

-- Insert org hierarchy
INSERT INTO org_hierarchy (employee_id, manager_id, level) VALUES
(1, NULL, 0),
(2, 1, 1),
(3, 2, 2),
(4, 1, 1),
(5, 4, 2),
(6, 1, 1),
(7, 6, 2),
(8, 1, 1),
(9, 1, 1),
(10, 8, 2);

-- Insert sample projects
INSERT INTO projects (name, description, status, start_date, end_date, manager_id) VALUES
('Mobile App Redesign', 'Complete redesign of mobile application UI/UX', 'active', '2024-01-15', '2024-06-30', 2),
('Cloud Migration', 'Migration of on-premise infrastructure to cloud', 'active', '2024-02-01', '2024-08-31', 2),
('Q4 Marketing Campaign', 'Comprehensive Q4 digital marketing campaign', 'active', '2024-10-01', '2024-12-31', 6),
('Customer Portal', 'New customer self-service portal development', 'on_hold', '2024-03-01', '2024-09-30', 2),
('Data Analytics Initiative', 'Implementation of advanced analytics platform', 'active', '2024-04-01', '2024-10-31', 2);

-- Insert announcements
INSERT INTO announcements (title, content, author_id, priority) VALUES
('Welcome to CorpLink', 'Our new Employee Portal is now live! Explore all features and stay connected.', 1, 'high'),
('Q4 Office Closure', 'Offices will be closed from December 24-26 for the holidays.', 8, 'medium'),
('New Remote Work Policy', 'We are updating our remote work policy to allow flexible working arrangements.', 8, 'medium'),
('Performance Review Period', 'Annual performance reviews will be conducted from November 1-30.', 8, 'high'),
('IT System Maintenance', 'Scheduled system maintenance on Sunday, October 15 from 2-6 AM EST.', 1, 'medium');

-- Insert holidays
INSERT INTO holidays (holiday_name, holiday_date, description) VALUES
('New Year Day', '2024-01-01', 'Public Holiday'),
('Independence Day', '2024-07-04', 'Public Holiday'),
('Labor Day', '2024-09-02', 'Public Holiday'),
('Thanksgiving', '2024-11-28', 'Public Holiday'),
('Christmas', '2024-12-25', 'Public Holiday'),
('Boxing Day', '2024-12-26', 'Public Holiday');

-- Insert sample leaves
INSERT INTO leaves (employee_id, leave_type, start_date, end_date, status, reason, approver_id) VALUES
(3, 'vacation', '2024-07-15', '2024-07-19', 'approved', 'Summer vacation', 2),
(5, 'sick', '2024-06-10', '2024-06-10', 'approved', 'Medical appointment', 4),
(7, 'personal', '2024-08-01', '2024-08-02', 'pending', 'Personal matters', NULL),
(10, 'vacation', '2024-09-20', '2024-09-27', 'approved', 'Family trip', 8);

-- Insert sample timesheets
INSERT INTO timesheets (employee_id, date, hours_worked, project_id, status) VALUES
(3, '2024-10-10', 8.00, 1, 'approved'),
(3, '2024-10-11', 7.50, 2, 'submitted'),
(5, '2024-10-10', 8.00, 3, 'approved'),
(7, '2024-10-11', 8.00, 3, 'draft');

-- Insert sample certifications
INSERT INTO certifications (employee_id, certification_name, issuing_organization, issue_date, expiry_date) VALUES
(3, 'AWS Certified Solutions Architect', 'Amazon Web Services', '2023-01-15', '2025-01-15'),
(3, 'Google Cloud Professional', 'Google Cloud', '2023-06-20', '2025-06-20'),
(5, 'Salesforce Administrator Certified', 'Salesforce', '2023-03-10', '2025-03-10'),
(7, 'HubSpot Inbound Marketing', 'HubSpot', '2024-02-01', '2026-02-01');

-- Insert sample policies
INSERT INTO policies (title, category, content, version) VALUES
('Code of Conduct', 'General', 'All employees must adhere to our code of conduct which promotes ethical behavior and respect for all individuals.', 1),
('Remote Work Policy', 'Work Arrangements', 'Employees are eligible for flexible remote work arrangements up to 3 days per week, subject to manager approval.', 1),
('IT Security Policy', 'Security', 'All employees must follow IT security protocols including strong password management and data protection.', 1),
('Leave Policy', 'Time Off', 'Employees are entitled to annual leave as per local regulations and company policy.', 1),
('Diversity & Inclusion', 'General', 'We are committed to creating an inclusive workplace that values diversity and respects all individuals.', 1);

-- Insert sample expenses
INSERT INTO expenses (employee_id, amount, category, description, status, submitted_date) VALUES
(3, 150.00, 'travel', 'Flight to client meeting in New York', 'approved', '2024-10-05'),
(5, 85.50, 'meals', 'Client dinner meeting', 'pending', '2024-10-08'),
(7, 220.00, 'equipment', 'Office supplies and printer cartridges', 'approved', '2024-10-06');

-- Insert sample rewards/recognition
INSERT INTO rewards (employee_id, reward_type, points, description, given_by) VALUES
(3, 'star_of_month', 500, 'Excellent performance on cloud migration project', 2),
(5, 'team_player', 250, 'Great collaboration on sales campaign', 4),
(7, 'innovation', 400, 'Innovative marketing ideas implemented successfully', 6),
(10, 'excellence', 300, 'Consistent high-quality work', 8);

-- Insert sample surveys
INSERT INTO surveys (title, description, created_by, status, start_date, end_date) VALUES
('Employee Satisfaction Survey', 'Annual survey to assess employee satisfaction and engagement', 1, 'active', NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY)),
('Workplace Culture Assessment', 'Measure workplace culture and team dynamics', 1, 'active', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY)),
('Product Feedback Survey', 'Gather feedback on new product features', 6, 'draft', DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_ADD(NOW(), INTERVAL 21 DAY));
