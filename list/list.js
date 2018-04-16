const express = require('express'),
  listRouter = express.Router();

function getModel() {
    return require('./model-datastore');
}

listRouter.route('/')
  .get(function(req, res) {
    const user = req.user;
    getModel().f3(user.email, (entities) => {
      res.render('myList', { user: req.user, recyclables: entities });
    });
    // getModel().findRecyclables(user.email);

  })

module.exports = listRouter;
