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

// const getAdminUsers = async () => {
//   let res = await pool.query('SELECT * FROM ADMIN_USER');
//   let rows = res[0];
//   console.log(rows);
//   return rows;
// };

// get one admin user
router.get('/getAdminUser/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    // do ID validation before sending request
    const [rows] = await pool.query(`SELECT * FROM ADMIN_USER USER WHERE id=?`, id);
    // ? (prepared statement) sending sql request and values separately is to prevent sql injection attacks and increase security
    console.log(rows);
    res.status(200).send({
      employee: rows,
      message: 'Admin User retrieved successfully.',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: getting admin user by ID', error);
    res.status(400).send({
      message: 'GET ADMIN USER BY ID REQ: internal server error',
      timestamp: new Date(),
    });
  }
});

// const getOneAdmin = async (id) => {
//   // do ID validation before sending request
//   const [rows] = await pool.query(`SELECT * FROM ADMIN_USER USER WHERE id=?`, id);
//   // ? (prepared statement) sending sql request and values separately is to prevent sql injection attacks and increase security
//   return rows;
// };

router.post('/createAdminUser', async (req, res, next) => {
  try {
    console.log('BODY: ', req.body);
    let {employee_id, firstname, lastname} = req.body;
    await pool.query(`INSERT INTO ADMIN_USER (employee_id, firstname, lastname) VALUES
    (?, ?, ?)`, [employee_id, firstname, lastname]);
    res.status(200).send({
      message: `ADMIN USER ${firstname} ${lastname} CREATED successfully`,
      timestamp: new Date(),
    });

  } catch (error) {
    console.error('ERROR: creating admin user', error);
    res.status(400).send({
      message: 'POST ADMIN USER REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

// const createAdminUser = async (employee_id, firstname, lastname) => {
//   await pool.query(`INSERT INTO ADMIN_USER (employee_id, firstname, lastname) VALUES
//     (?, ?, ?)`, [employee_id, firstname, lastname]);
// };

router.delete('/removeAdminUser/:id', async (req, res, next) => {
  try {
    let employee_id = req.params.id;
    console.log(employee_id);
    await pool.query(`DELETE FROM ADMIN_USER WHERE employee_id=?`, employee_id);
    res.status(200).send({
      message: `ADMIN USER ${employee_id} DELETED successfully`,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: deleting admin user', error);
    res.status(400).send({
      message: 'DELETE ADMIN USER REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});
// const deleteAdminUser = async (employee_id) => {
//   await pool.query(`DELETE FROM ADMIN_USER WHERE employee_id=?`, employee_id);
// };

module.exports = router;
