
const express = require('express');
const router = express.Router();
const paypal = require('../services/paypal');
const pool = require('../services/db');
const { json } = require('body-parser');

const {  createOrder, captureOrder } = paypal;
let cart = {};

router.post('/api/orders', async (req, res, next) => {
  try {
    console.log('REQ BODY: ' + req.body);
    cart = req.body;

    console.log('REQ BODY OF CART: ' + JSON.stringify(cart));
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error('ERROR: creating order:', error);
    res.status(500).json({error: 'Failed to create new order.'});
  }
});

router.post('/api/orders/:orderID/capture', async (req, res) => {
  console.log('HELLO CAPTURE ORDER');
  try {
    const orderID = req.params;
    console.log('ID: ' + orderID);
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID.orderID);
    console.log('CAPTURE ORDER jsonRESPONSE', jsonResponse);

    // add order to database
    if(jsonResponse.status === 'COMPLETED'){
      createDBOrder(jsonResponse);
    }

    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error('ERROR: capture order failed', error);
    res.status(500).json({error: 'Failed to capture order.'});
  }
});

const createDBOrder = async (jsonResponse) => {
  try {
    // custom_key, firstname, lastname, subtotal, total,
    let firstname = jsonResponse.payer.name.given_name;
    let lastname = jsonResponse.payer.name.surname;
    let email = jsonResponse.payer.email_address;
    let custom_key = jsonResponse.id;
    let subtotal = cart.subtotal;
    let total = cart.total;

    let result = await pool.query(`INSERT INTO CUSTOMER_ORDER (id, firstname, lastname, subtotal, total, fulfilled)
    VALUES (?, ?, ?, ?, ?, ?)`, [custom_key, firstname, lastname, subtotal, total, false]);
    console.log('affectedRows: ', result);
    if(result.affectetRows){
      console.log('Succesfully added order to Customer Orders table');
    }

    for(let item of cart.menu_item){
      await pool.query(`INSERT INTO ORDER_ITEM (order_id, menu_id, quantity)
      VALUES (?,?,?)`, [custom_key, item.item_id, item.quantity]);
    }
    console.log('Succesfully added order items to database.');
  } catch (error) {
    console.error('ERROR: creating new order', error);
  }
};

module.exports = router;
