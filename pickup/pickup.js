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
    const fn = req.user.firstName;
    const ln = req.user.lastName;
    if (typeof data.item === 'string') {
      data.item = getModel().processItemAsArray(data.item);
    }
    data.processed = false;
    // if (req.user) {
    //   data.createdBy = req.user.firstName + ' ' + req.user.lastName;
    // } else {
    //   data.createdBy = 'anonymous';
    // }
    // data.pickedUpBy = '';
    getModel().create(data, userEmail);

    res.redirect('/register/mapui');
});

module.exports = pickupRouter;
