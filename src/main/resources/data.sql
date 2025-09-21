-- Use uppercase table names to match JPA entity naming convention
--INSERT INTO USERS (username, password, email, role, created_at) VALUES
  --                                                                  ('admin', '$2a$10$CwTycUXWue0Twk9dxz5cOe1qHrEOlF1YxVRnXj1UvnY85xQD.cg5a', 'admin@example.com', 'ADMIN', CURRENT_TIMESTAMP),
    --                                                                ('user', '$2a$10$CwTycUXWue0Twk9dxz5cOe1qHrEOlF1YxVRnXj1UvnY85xQD.cg5a', 'user@example.com', 'USER', CURRENT_TIMESTAMP);
-- Use uppercase table names to match JPA entity naming convention
INSERT INTO USERS (username, password, email, role, created_at) VALUES
                                                                    ('admin', '$2a$10$POy3eKMT61ETLrhqTcEPqe.LR4HcxX9HbkfoK.JfA5DYIPhFpl7/y', 'admin@example.com', 'ADMIN', CURRENT_TIMESTAMP),
                                                                    ('user', '$2a$10$POy3eKMT61ETLrhqTcEPqe.LR4HcxX9HbkfoK.JfA5DYIPhFpl7/y', 'user@example.com', 'USER', CURRENT_TIMESTAMP);

-- Insert sample vendors
INSERT INTO VENDORS (name, contact_person, email, phone, status, created_at, updated_at) VALUES
                                                                                             ('Tech Solutions Inc.', 'John Doe', 'john@techsolutions.com', '+1234567890', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                             ('Cloud Services Ltd.', 'Jane Smith', 'jane@cloudservices.com', '+1234567891', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                             ('Security Corp.', 'Bob Johnson', 'bob@securitycorp.com', '+1234567892', 'INACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample services
INSERT INTO SERVICES (service_name, start_date, expiry_date, payment_due_date, amount, status, vendor_id, created_at, updated_at) VALUES
                                                                                                                                      ('Web Development', '2024-01-01', '2024-12-31', '2024-01-25', 5000.00, 'ACTIVE', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                                      ('Cloud Hosting', '2024-02-01', '2024-02-28', '2024-02-20', 1200.00, 'PAYMENT_PENDING', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                                      ('Security Audit', '2024-01-15', '2024-01-30', '2024-01-25', 3000.00, 'EXPIRED', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
-- Insert sample vendors
INSERT INTO VENDORS (name, contact_person, email, phone, status, created_at, updated_at) VALUES
                                                                                             ('Tech Solutions Inc.', 'John Doe', 'john@techsolutions.com', '+1234567890', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                             ('Cloud Services Ltd.', 'Jane Smith', 'jane@cloudservices.com', '+1234567891', 'ACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                             ('Security Corp.', 'Bob Johnson', 'bob@securitycorp.com', '+1234567892', 'INACTIVE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample services
INSERT INTO SERVICES (service_name, start_date, expiry_date, payment_due_date, amount, status, vendor_id, created_at, updated_at) VALUES
                                                                                                                                      ('Web Development', '2024-01-01', '2024-12-31', '2024-01-25', 5000.00, 'ACTIVE', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                                      ('Cloud Hosting', '2024-02-01', '2024-02-28', '2024-02-20', 1200.00, 'PAYMENT_PENDING', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
                                                                                                                                      ('Security Audit', '2024-01-15', '2024-01-30', '2024-01-25', 3000.00, 'EXPIRED', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);