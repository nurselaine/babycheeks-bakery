const express = require('express');

const app = express();
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

const start = () => {
    app.listen(PORT, () => { console.log(`Listening on PORT ${PORT}`)});
}

module.exports = { start };
