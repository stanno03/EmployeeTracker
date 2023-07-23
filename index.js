// this class will be used to start the application

// import required packages
const inquirer = require('inquirer');
const DB = require('./lib/db_connection');
const helper = require('./lib/helper');
const start = require('./lib/start');

// run the application
async function main (){

  DB.databaseConnect();
  await start();

}


main();