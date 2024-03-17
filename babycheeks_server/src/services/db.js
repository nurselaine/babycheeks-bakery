'use strict';
const mysql = require('mysql2');
require('dotenv').config();

// TODO: Create DB connection to MySQL

// collection of connections to db that can be re-used
// which is beneficial for scaling application
const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_ROOT,
  password: process.env.DATABASE_KEY,
  database: process.env.DATABASE_NAME,
}).promise();

module.exports = pool;

// // gets all shop owners
// const getAdminUsers = async () => {
//   let res = await pool.query('SELECT * FROM ADMIN_USER');
//   let rows = res[0];
//   console.log(rows);
//   return rows;
// };

// const getOneAdmin = async (id) => {
//   // do ID validation before sending request
//   const [rows] = await pool.query(`SELECT * FROM ADMIN_USER USER WHERE id=?`, id);
//   // ? (prepared statement) sending sql request and values separately is to prevent sql injection attacks and increase security
//   return rows;
// };

// const createAdminUser = async (employee_id, firstname, lastname) => {
//   await pool.query(`INSERT INTO ADMIN_USER (employee_id, firstname, lastname) VALUES
//     (?, ?, ?)`, [employee_id, firstname, lastname]);
// };

// const deleteAdminUser = async (employee_id) => {
//   await pool.query(`DELETE FROM ADMIN_USER WHERE employee_id=?`, employee_id);
// };

// getAdminUsers();
