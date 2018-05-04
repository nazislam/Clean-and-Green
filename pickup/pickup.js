/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const pickupRouter = express.Router();

function getModel() {
    return require('./model-datastore');
}

// Automatically parse request body as form data
pickupRouter.use(bodyParser.urlencoded({ extended: false }));


pickupRouter.route('/')
  .all(function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  })
  .get((req, res) => {
    res.render('../views/pickup');
  })
  .post((req, res) => {
    const data = req.body;
    const userEmail = req.user.email;
    if (typeof data.item === 'string') {
      data.item = getModel().processItemAsArray(data.item);
    }
    data.processed = false;
    getModel().create(data, userEmail);
    setTimeout(function() {
      res.redirect('/register/clientUI');
    }, 5000);
});

module.exports = pickupRouter;
