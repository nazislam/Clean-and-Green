/* jshint esversion: 6 */
/* jshint node: true */

const express = require('express'),
  listRouter = express.Router();

function getModel() {
    return require('./model-datastore');
}

listRouter.route('/')
  .get(function(req, res) {
    const user = req.user;
    getModel().findRecyclables(user.email, (entities) => {
      res.render('myList', { user: req.user, recyclables: entities });
    });
  });

module.exports = listRouter;
