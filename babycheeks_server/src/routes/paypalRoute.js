
const express = require('express');
const router = express.Router();
const paypal = require('../services/paypal');

const {  handleResponse, createOrder, captureOrder } = paypal;

router.post('/api/orders', async (req, res, next) => {
  try {
    console.log('REQ BODY: ' + req.body);
    const cart = req.body;
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
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error('ERROR: capture order failed', error);
    res.status(500).json({error: 'Failed to capture order.'});
  }
});

module.exports = router;
