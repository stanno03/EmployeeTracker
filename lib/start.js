// handles the inqurier queries and responses
const inquirer = require('inquirer');
// import employeeTracker function from start.js
const mysql2 = require('mysql2');
const env = require('dotenv').config();
// import the CRUD functions


const db = mysql2.createConnection({

    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

// start inquirer and prompt the user
function employeeTracker() {
    inquirer.prompt([{
        type: 'list',
        name: 'Main',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Delete a Department', 'Exit'],

    }]).then((answers) => {

        switch (answers.Main) {
            case 'View all Departments':
                return viewAllDepartments();
            case 'View all Roles':
                return viewAllRoles();
            case 'View all Employees':
                return viewAllEmployees();
            case 'Add a Department':
                return addDepartment();
            case 'Add a Role':
                return addRole();
            case 'Add an Employee':
                return addEmployee();
            case 'Update an Employee Role':
                return updateEmployeeRole();
            case 'Delete a Department':
                return deleteDepartment();
            case 'Exit':
                return exit();
     }
})



function viewAllDepartments() {
const query = 'SELECT * FROM department ORDER BY id ASC';
  db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeTracker();
  });
    
};

function viewAllRoles() {
 const query = 'SELECT * FROM role ORDER BY id ASC';
 db.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    employeeTracker();
     });
    };

function viewAllEmployees(){
    const query = 'SELECT * FROM employee ORDER BY id ASC';
    db.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        employeeTracker();
        });
}

function addDepartment() {
    inquirer
      .prompt([
        {
          name: 'name',
          type: 'input',
          message: 'Enter the name of the new department:',
        },
      ])
      .then((answer) => {
        const query = 'INSERT INTO department SET ?';
        db.query(query, answer, (err, res) => {
          if (err) throw err;
          console.log('Department added successfully!');
          employeeTracker();
        });
      });
  }

function addRole() {
    db.query('SELECT id, name FROM department', (err, res) => {
      if (err) throw err;
      const departments = res.map((department) => ({
        name: department.name,
        value: department.id,
      }));
  
      inquirer
        .prompt([
          {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the new role:',
          },
          {
            name: 'salary',
            type: 'number',
            message: 'Enter the salary for the new role:',
          },
          {
            name: 'department_id',
            type: 'list',
            message: 'Select the department for the new role:',
            choices: departments,
          },
        ])
        .then((answer) => {
          const query = 'INSERT INTO role SET ?';
          db.query(query, answer, (err, res) => {
            if (err) throw err;
            console.log('Role added successfully!');
            employeeTracker();
          });
        });
    });
  }

function addEmployee() {
    db.query('SELECT id, title FROM role', (err, res) => {
      if (err) throw err;
      const roles = res.map((role) => ({
        name: role.title,
        value: role.id,
      }));
  
      inquirer
        .prompt([
          {
            name: 'first_name',
            type: 'input',
            message: "Enter the employee's first name:",
          },
          {
            name: 'last_name',
            type: 'input',
            message: "Enter the employee's last name:",
          },
          {
            name: 'role_id',
            type: 'list',
            message: "Select the employee's role:",
            choices: roles,
          },
        ])
        .then((answer) => {
          const query = 'INSERT INTO employee SET ?';
          db.query(query, answer, (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            employeeTracker();
          });
        });
    });
  }

  function updateEmployeeRole() {
    db.query('SELECT id, CONCAT(first_name, " ", last_name) AS employee FROM employee', (err, res) => {
      if (err) throw err;
      const employees = res.map((employee) => ({
        name: employee.employee,
        value: employee.id,
      }));
  
      db.query('SELECT id, title FROM role', (err, res) => {
        if (err) throw err;
        const roles = res.map((role) => ({
          name: role.title,
          value: role.id,
        }));
  
        inquirer
          .prompt([
            {
              name: 'employee_id',
              type: 'list',
              message: 'Select the employee to update:',
              choices: employees,
            },
            {
              name: 'role_id',
              type: 'list',
              message: 'Select the new role:',
              choices: roles,
            },
          ])
          .then((answer) => {
            const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
            db.query(query, [answer.role_id, answer.employee_id], (err, res) => {
              if (err) throw err;
              console.log('Employee role updated successfully!');
              employeeTracker();
            });
          });
      });
    });
  }

  function deleteDepartment() {
    db.query('SELECT id, name FROM department', (err, res) => {
      if (err) throw err;
      const departments = res.map((department) => ({
        name: department.name,
        value: department.id,
      }));
  
      inquirer
        .prompt([
          {
            name: 'department_id',
            type: 'list',
            message: 'Select the department to delete:',
            choices: departments,
          },
        ])
        .then((answer) => {
          const query = 'DELETE FROM department WHERE ?';
          db.query(query, { id: answer.department_id }, (err, res) => {
            if (err) throw err;
            console.log('Department deleted successfully!');
            employeeTracker();
          });
        });
    });
  }

};

module.exports = { employeeTracker };
