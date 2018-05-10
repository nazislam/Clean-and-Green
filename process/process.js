/* jshint esversion: 6 */
/* jshint node: true */

'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const processRouter = express.Router();

function getModel() {
  return require('./model-datastore');
}

// Automatically parse request body as form data
processRouter.use(bodyParser.urlencoded({ extended: false }));


processRouter.route('/')
  .all(function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  })
  // .get((req, res) => {
  //   res.send('in process router');
  // })
  .post((req, res) => {
    const data = req.body;
    console.log(data);
    const address = data.address;
    getModel().processRequest(req.user.email, address);
    setTimeout(function() {
      res.redirect('/register/driverUI');
    }, 4000);
});

module.exports = processRouter;

