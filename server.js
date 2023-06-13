// import required packages
const express = require('express');
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
      database: 'courses_db'
    },
    console.log(`Connected to the courses_db database.`)
  );