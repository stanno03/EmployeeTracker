// import required packages
const inquirer = require('inquirer');
const express = require('express');
const helper = require('helper.js');
const app = express();
// Import and require mysql2
const mysql = require('mysql2');

// midleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to DB 
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employeeData'
    },
    console.log(`Connected to the employeeData database.`)
  );

  function employeeTracker (){
    inquirer.prompt([{
        type: 'list',
        name: 'selected',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'Exit'],

    }]).then((answers)=>{

        if(viewAllDepartments){

        }

        else if(dsad){

        }

    })


  }