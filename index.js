// this class will be used to start the application

// import required packages
const inquirer = require('inquirer');
const env = require('dotenv').config();

const mysql2 = require('mysql2');
const { employeeTracker }  = require('./lib/start');

const db = mysql2.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


// run the application
function main (){

  employeeTracker();

}


main();