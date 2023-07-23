// this class will handle the connection to the database
// import mysql and env
const mysql = require('mysql2');
const env = require('dotenv').config();

// handles the connection to the employeeData DB
async function databaseConnect() {

    // Connect to database
    connect = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'employeeData'
});

};

module.exports = { databaseConnect };