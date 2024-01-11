'use strict';

const logger = (req, res, next) => {
    console.log(`REQUEST METHOD: ${req. method}, ${req.originalUrl}`);
    next();
}

module.exports = logger;
