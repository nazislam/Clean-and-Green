/* jshint esversion: 6 */
/* jshint node: true */

'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const pickupRouter = express.Router();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

function getModel() {
  return require('./model-datastore');
}

pickupRouter.use(bodyParser.urlencoded({ extended: false }));
pickupRouter.use(cookieParser());
pickupRouter.use(session({
  secret: 'secret',
  key: 'key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
pickupRouter.use(flash());


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
    req.flash('success', 'Success! Your request has been sent. Please refresh the page to update the map.');
    res.redirect('/register/clientUI');
});

module.exports = pickupRouter;
