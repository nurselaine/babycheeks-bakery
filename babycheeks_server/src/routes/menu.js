"use strict";

const express = require("express");
const router = express.Router();
const client = require("../services/cf");

// get all CMS entires route
router.get("/", async (req, res, next) => {
    try {
        let cookies = [];
        let entries = await client.getEntries();
        entries.items.forEach((entry) => {
            if (entry.fields.title) {
                cookies.push(entry.fields.title);
            }
        });

        console.log(cookies);

        res.status(200).send({
            items: cookies,
            message: "Cookies retrieved successfully.",
            timestamp: new Date(),
        });
    } catch (error) {
        console.error('Error requesting all menu items', error);
        res.status(400).send({
            message: "internal server error",
            timestamp: new Date(),
        })
    }
});

module.exports = router;
