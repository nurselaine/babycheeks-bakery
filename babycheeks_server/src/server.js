const express = require('express');
const logger = require("./middlewares/logger");
const CMS = require('./routes/menu');
require('dotenv').config();

const app = express();

const PORT = 3001 || 3002;

app.use(logger);
app.use('/menu', CMS);

app.use("/request-type", logger, (req, res, next) => {
  console.log(Date.now());
  next();
})

app.get("/", logger, (req, res) => {
  console.log("Hello Baby Cheeks Server");
})

const start = () => {
    app.listen(PORT, () => { console.log(`Listening on PORT ${PORT}`)});
}

module.exports = { start };
