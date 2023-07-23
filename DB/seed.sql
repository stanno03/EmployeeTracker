-- seed the tables
INSERT INTO department (name)
VALUES
('Sales'),
('Marketing'),
('Management');


INSERT INTO role (title, salary, department_id)
VALUES
('Salesperson', 70000, 001),
('Social Media Marketer', 75000, 002),
('Service Desk Teamlead', 75000, 003);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Harry', 'Potter', 003, 001),
('Hermoine', 'Granger', 002, NULL),
('Ron', 'Weasley', 001, NULL);
