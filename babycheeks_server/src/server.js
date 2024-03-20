const express = require('express');
const logger = require('./middlewares/logger');
const CMS = require('./routes/menu');
const DB = require('./routes/dbRoute');
const PAYPAL = require('./routes/paypalRoute');
require('dotenv').config();

const app = express();
app.use(express.json());
// host static files
app.use(express.static('client'));

const PORT = process.env.PORT || 3002;

app.use(logger);
app.use('/menu', CMS);
app.use('/db', DB);
app.use('/pay', PAYPAL);

app.use('/request-type', logger, (req, res, next) => {
  console.log(Date.now());
  next();
});

app.get('/', logger, (req, res) => {
  console.log('Hello Baby Cheeks Server');
});

const start = () => {
  app.listen(PORT, () => { console.log(`Listening on PORT ${PORT}`);});
};

module.exports = { start };
