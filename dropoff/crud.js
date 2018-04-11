const express = require('express');
const bodyParser = require('body-parser');
const dropoffRouter = express.Router();

function getModel() {
    return require('./model-datastore');
}

// Automatically parse request body as form data
dropoffRouter.use(bodyParser.urlencoded({ extended: false }));


dropoffRouter.route('/')
  .all(function(req, res, next) {
      if (!req.user) {
          res.redirect('/');
      }
      next();
  })
  .get((req, res) => {
    res.render('../views/dropoff');
  });

dropoffRouter.route('/').post((req, res) => {
  const data = req.body;
  if (typeof data.item === 'string') {
    data.item = getModel().processItemAsArray(data.item);
  }
  if (req.user) {
    data.createdBy = req.user.firstName + ' ' + req.user.lastName;
  } else {
    data.createdBy = 'anonymous';
  }
  data.pickedUpBy = '';
  getModel().create(data);

  res.redirect('/register/mapui');
});

module.exports = dropoffRouter;
