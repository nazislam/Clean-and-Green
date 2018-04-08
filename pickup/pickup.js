'use strict';

const express = require('express'),
  pickupRouter = express.Router();

function getModel() {
    return require('./model-datastore');
}

pickupRouter.route('/')
  .get(function(req ,res) {
    getModel().listRequest();
    res.render('pickup');
  });

module.exports = pickupRouter;
