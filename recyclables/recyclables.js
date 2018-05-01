/* jshint esversion: 6 */
/* jshint node: true */


'use strict';

const express = require('express'),
  recyclablesRouter = express.Router();

function getModel() {
    return require('./model-datastore');
}

recyclablesRouter
  .get('/', (req, res, next) => {
    getModel().list(10, req.query.pageToken, (err, entities, cursor) => {
      if (err) {
        next(err);
        return;
      }
      res.render('recyclables.pug', {
        title: 'Pickup', entries: entities
        // nextPageToken: cursor
      });
    });
  });


module.exports = recyclablesRouter;
