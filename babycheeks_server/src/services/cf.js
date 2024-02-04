'use strict';

const contentful = require('contentful');
require('dotenv').config();

// configure contentful
let client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    environment: 'master', // defaults to 'master' if not set
    accessToken: process.env.CONTENTFUL_ACCESSTOKEN
});

module.exports = client;
