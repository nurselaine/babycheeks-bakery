const express = require('express');
const contentful = require('contentful');

const app = express();
require('dotenv').config();

const PORT = 3001 || 3002;

const logger = require("./middlewares/logger");

app.use(logger);

app.use("/", (req, res, next) => {
  console.log("middleware /");
  next();
})

app.use("/request-type", (req, res, next) => {
  console.log(Date.now());
  next();
})

app.get("/", (req, res) => {
  console.log("Hello Baby Cheeks Server");
})

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    environment: 'master', // defaults to 'master' if not set
    accessToken: process.env.CONTENTFUL_ACCESSTOKEN
  })

  client.getEntries().then((entries) => {
    entries.items.forEach((entry) => {
        if(entry.fields.title) {
            console.log(entry.fields.title);
            console.log(entry.fields.description);
        }
    })
  })

const start = () => {
    app.listen(PORT, () => { console.log(`Listening on PORT ${PORT}`)});
}

module.exports = { start };
