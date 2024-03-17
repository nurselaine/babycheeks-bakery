'use strict';

const express = require('express');
const router = express.Router();
const pool = require('../services/db');

// implement router for employee data to server to client side
// gets all shop owners
router.get('/getAdminUsers', async (req, res, next) => {
  try {
    let resRows = await pool.query('SELECT * FROM ADMIN_USER');
    let rows = resRows[0];
    console.log(resRows);
    res.status(200).send({
      employees: rows,
      message: 'Admin Users retrieved successfully.',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: getting admin users', error);
    res.status(400).send({
      message: 'GET ADMIN USER REQ: internal server error',
      timestamp: new Date(),
    });
  }
});

const getAdminUsers = async () => {
  let res = await pool.query('SELECT * FROM ADMIN_USER');
  let rows = res[0];
  console.log(rows);
  return rows;
};

const getOneAdmin = async (id) => {
  // do ID validation before sending request
  const [rows] = await pool.query(`SELECT * FROM ADMIN_USER USER WHERE id=?`, id);
  // ? (prepared statement) sending sql request and values separately is to prevent sql injection attacks and increase security
  return rows;
};

const createAdminUser = async (employee_id, firstname, lastname) => {
  await pool.query(`INSERT INTO ADMIN_USER (employee_id, firstname, lastname) VALUES
    (?, ?, ?)`, [employee_id, firstname, lastname]);
};

const deleteAdminUser = async (employee_id) => {
  await pool.query(`DELETE FROM ADMIN_USER WHERE employee_id=?`, employee_id);
};

module.exports = router;
