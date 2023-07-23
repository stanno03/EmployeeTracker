// handles the inqurier queries and responses
const inquirer = require('inquirer');

// import the CRUD functions
const helper = require('./lib/helper');

// start inquirer and prompt the user
function employeeTracker() {
    inquirer.prompt([{
        type: 'list',
        name: 'selected',
        choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit'],

    }]).then((answers) => {

        if (answers.selected === 'View all Departments') {
            helper.viewAllDepartments();
            employeeTracker();
        }

        else if (answers.selected === 'View all Roles') {
            helper.viewAllRoles();
            employeeTracker();
        }

        else if (answers.selected === 'View all Employees') {
            helper.viewAllEmployees();
            employeeTracker();
        }

        else if (answers.selected === 'Add a Department') {
            helper.addDepartment();
            employeeTracker();
        }

        else if (answers.selected === 'Add a Role') {
            helper.addRole();
            employeeTracker();
        }

        else if (answers.selected === 'Add an Employee') {
            helper.addEmployee();
            employeeTracker();
        }

        else if (answers.selected === 'Update an Employee Role') {
            helper.updateEmployeeRole();
            employeeTracker();
        }
        else exit();

    })
}