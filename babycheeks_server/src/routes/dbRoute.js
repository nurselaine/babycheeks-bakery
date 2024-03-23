'use strict';

const {v4: uuidv4} = require('uuid');
const express = require('express');
const router = express.Router();
const pool = require('../services/db');

// implement router for employee data to server to client side

// ****************** ADMIN USERS **********************
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


// ****************** ORDERS **************************

// get all orders
router.get('/getAllOrders', async (req, res, next) => {
  try {
    let resRows = await pool.query(`SELECT * FROM CUSTOMER_ORDER`);
    let rows = resRows[0];
    console.log(resRows);
    res.status(200).send({
      orders: rows,
      message: 'ALL customer orders retrieved successfully.',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: find all customer orders', error);
    res.status(400).send({
      message: 'GET ALL ORDERS REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

// get fulfilled order
router.get('/getFulfilled', async (req, res, next) => {
  try {
    let rows = await pool.query(`SELECT * FROM CUSTOMER_ORDER WHERE fulfilled=?`, [true]);
    console.log(rows[0]);
    res.status(200).send({
      fullfilled_orders: rows[0],
      message: 'Fulfilled customer orders retrieved successfully.',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: find all customer orders', error);
    res.status(400).send({
      message: 'GET ALL FULFILLED ORDERS REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

// get unfulfilled order
router.get('/getUnfulfilled', async (req, res, next) => {
  try {
    let [rows] = await pool.query(`SELECT * FROM CUSTOMER_ORDER WHERE fulfilled=?`, [false]);
    console.log(rows);
    res.status(200).send({
      fullfilled_orders: rows,
      message: 'Unfulfilled customer orders retrieved successfully.',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: find all unfulfilled customer orders', error);
    res.status(400).send({
      message: 'GET ALL UNFULFILLED ORDERS REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

// get order by customer
router.get('/getCustomerOrder/:id', async (req, res, next) => {
  try {
    let order_id = req.params.id;
    let [rows] = await pool.query(`SELECT * FROM CUSTOMER_ORDER WHERE id=?`, [order_id]);
    let items = await pool.query('SELECT * FROM ORDER_ITEM WHERE order_id=?', [order_id]);
    console.log(items);
    res.status(200).send({
      orders: rows,
      items: items[0],
      message: 'Customer orders retrieved successfully.',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: find all customer orders', error);
    res.status(400).send({
      message: 'GET ALL ORDERS REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

router.get('/getAllOrderItems', async (req, res, next) => {
  let items = await pool.query(`SELECT * FROM ORDER_ITEM`);
  console.log('order item table', items);
  res.status(200).send(items);
});

// create customer order
router.post('/createNewOrder', async (req, res, next) => {
  try {
    let custom_key = uuidv4();
    let {firstname, lastname, subtotal, total, items} = req.body;
    await pool.query(`INSERT INTO CUSTOMER_ORDER (id, firstname, lastname, subtotal, total, fulfilled)
    VALUES (?, ?, ?, ?, ?, ?)`, [custom_key, firstname, lastname, subtotal, total, false]);

    // create order item for each cart item
    for(let item of items){
      await pool.query(`INSERT INTO ORDER_ITEM (order_id, menu_id, quantity)
      VALUES (?,?,?)`, [custom_key, item[0], item[1]]);
    }
    res.status(200).send({
      message: 'SUCCESSFULLY ADDED NEW ORDER',
      order: items,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: creating new order', error);
    res.status(400).send({
      message: 'POST CREATE NEW ORDER REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

// update customer order fullfillment status
router.put('/updateOrderStatus/:id', async (req, res, next) => {
  try {
    let order_id = req.params.id;
    await pool.query(`UPDATE CUSTOMER_ORDER co SET fulfilled = ? WHERE co.id = ?`, [true, order_id]);
    res.status(200).send({
      message: 'SUCCESSFULLY UPDATED ORDER STATUS TO FULFILLED',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: updateing order status', error);
    res.status(400).send({
      message: 'PUT ORDER FULFILLMENT REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

// ********************* MENU ******************************

// get all menu items
router.get('/getMenu', async (req, res, next) => {
  try {
    let rows = await pool.query(`SELECT * FROM MENU`);
    res.status(200).send({
      items: rows[0],
      message: 'SUCCESSFULLY RETREIVED MENU DATA',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: Fetching menu information', error);
    res.status(400).send({
      message: 'GET MENU REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

// add menu item
router.post('/addToMenu', async (req, res, next) => {
  try {
    let {name, description, cost} = req.body;
    await pool.query(`INSERT INTO MENU (name, description, cost) VALUES (?, ?, ?)`, [name, description, cost]);
    res.status(200).send({
      message: 'SUCCESSFULLY ADD NEW MENU ITEM',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: adding new menu information', error);
    res.status(400).send({
      message: 'POST NEW MENU ITEM REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

// update menu item
router.put('/updateMenuItem/:id', async (req, res, next) => {
  try {
    let {name, description, cost} = req.body;
    let id = req.params.id;
    console.log(id);
    await pool.query(`UPDATE MENU SET name = ?, description = ?, cost = ? WHERE id=?`, [name, description, cost, id]);
    res.status(200).send({
      message: 'SUCCESSFULLY UPDATED MENU ITEM',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: updating menu information', error);
    res.status(400).send({
      message: 'PUT MENU ITEM REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

// delete menu item
router.delete('/deleteMenuItem/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    console.log(id);
    await pool.query(`DELETE FROM MENU WHERE id= ?`, id);
    res.status(200).send({
      message: 'SUCCESSFULLY UPDATED MENU ITEM',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR: deleting menu information', error);
    res.status(400).send({
      message: 'DELETE MENU ITEM REQ: internal server error',
      error,
      timestamp: new Date(),
    });
  }
});

// ?Synchronize data?

module.exports = router;
