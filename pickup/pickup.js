'use strict';

const express = require('express'),
  pickupRouter = express.Router();

function getModel() {
    return require('./model-datastore');
}

pickupRouter.get('/', (req, res, next) => {
  getModel().list(10, req.query.pageToken, (err, entities, cursor) => {
    if (err) {
      next(err);
      return;
    }
    res.render('pickup.pug', {
      title: 'Pickup', entries: entities
      // nextPageToken: cursor
    });
  });
});

/*
pickupRouter.route('/')
  .get(function(req ,res) {
    var entries = getModel().listRequest();
    console.log('----')
    console.log(entries);
    console.log('----')
    res.render('pickup', { entries: entries, a: [1,2,3] });
  });
*/

module.exports = pickupRouter;
