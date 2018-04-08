const express = require('express');
const bodyParser = require('body-parser');
const dropoffRouter = express.Router();

function getModel() {
    return require('./model-datastore');
}

// Automatically parse request body as form data
dropoffRouter.use(bodyParser.urlencoded({ extended: false }));


dropoffRouter.route('/').get((req, res) => {
    res.render('../views/dropoff');
});

dropoffRouter.route('/').post((req, res) => {
    const data = req.body;
    if (req.user) {
      data.createdBy = req.user.first_name;
    } else {
      data.createdBy = 'anonymous';
    }
    getModel().create(data);

    res.render('success.pug');
});

module.exports = dropoffRouter;
