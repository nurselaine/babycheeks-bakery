'use strict';

const express = require('express');
const router = express.Router();
const client = require('../services/cf');

// get all CMS entires route
router.get('/title', async (req, res, next) => {
  try {
    let cookies = [];
    let entries = await client.getEntries();
    entries.items.forEach((entry) => {
      if (entry.fields.title) {
        cookies.push(entry.fields.title);
      }
    });

    res.status(200).send({
      items: cookies,
      message: 'Cookies retrieved successfully.',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error requesting all menu name items', error);
    res.status(400).send({
      message: 'internal server error',
      timestamp: new Date(),
    });
  }
});

router.get('/description', async (req, res, next) => {
  try {
    let desc = [];
    let entries = await client.getEntries();
    entries.items.forEach((entry) => {
      if (entry.fields.description) {
        desc.push(entry.fields.description);
      }
    });

    res.status(200).send({
      items: desc,
      message: 'Cookie Descriptions retrieved successfully.',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error requesting all menu descriptions items', error);
    res.status(400).send({
      message: 'internal server error',
      timestamp: new Date(),
    });
  }
});

router.get('/menuItems', async (req, res, next) => {
  try {
    let entries = await client.getEntries();
    let menuItems = entries.items.map((entry, idx) => ({
      item_id: idx,
      item_name: entry.fields.title,
      item_description: entry.fields.description,
      pricing: {
        single: entry.fields.itemPrice,
        half_dozen: 18.5,
        dozen: 28,
      },
    }));

    res.status(200).send({
      menuItems,
      message: 'Menu items retrieved successfully.',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('ERROR trying to get menu items from CMS', error);
  }
});

router.get('/brand', async (req, res, next) => {
  try {
    let brandname = '';
    let entries = await client.getEntries();
    entries.items.forEach((entry) => {
      if (entry.fields.brandname) {
        brandname = entry.fields.brandname;
      }
    });

    res.status(200).send({
      items: brandname,
      message: 'Shop Information retrieved successfully.',
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error requesting all shop items', error);
    res.status(400).send({
      message: 'internal server error',
      timestamp: new Date(),
    });
  }
});

module.exports = router;
