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
    database: process.env.DATABASE_NAME
}).promise();

// gets all shop owners
const getAdminUsers = async () => {
    let res = await pool.query('SELECT * FROM ADMIN_USER');
    let rows = res[0];
    console.log(rows);
    return rows;
}
getAdminUsers();
