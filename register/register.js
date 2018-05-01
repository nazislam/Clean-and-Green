/* jshint esversion: 6 */
/* jshint node: true */


'use strict';

const express = require('express');
const registerRouter = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const validator = require('express-validator');
const {check, validationResult} = require('express-validator/check');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

function getModel() {
  return require('./model-datastore');
}

registerRouter.use(bodyParser.json());
registerRouter.use(bodyParser.urlencoded({ extended: false }));
registerRouter.use(validator());
registerRouter.use(cookieParser());
registerRouter.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
registerRouter.use(flash());

registerRouter.route('/')
  .get((req, res) => {
    res.render('../views/register');
  })
  .post((req, res) => {
    req.login(req.body, () => {
      const data = req.body;
      if (data.userType === 'client') {
        data.sentRequests = [];
        getModel().createClient(data);
        req.flash('success', "You've successfully registered. Please login to send a pickup request.");
        res.redirect('/');
      }
      else {
        data.listOfpickups = [];
        getModel().createDriver(data);
        req.flash('success', "You've successfully registered. Please login to pickup recyclables.");
        res.redirect('/');
      }

    });
  });

registerRouter.route('/signIn').post(
  passport.authenticate(['local', 'local2'], { session: true, 
    // successRedirect: '/register/profile', 
    failureRedirect: '/' }),
  (req, res) => {
    // res.redirect('/register/profile');
    console.log(req.user);
    if (req.user.userType === 'client') {
      req.flash('success', 'welcome user');
      res.redirect('/register/clientUI');
    }
    else
      res.redirect('/register/driverUI');
  }
);


registerRouter.route('/profile')
  .all(function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  })
  .get((req, res) => {
    if (req.user.userType === 'client')
      res.render('clientProfile', { user: req.user });
    else
      res.render('driverProfile', { user: req.user });
  });


registerRouter.route('/clientUI')
  .all(function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  })
  .get((req, res, next) => {
    const user = req.user;
    console.log('user:-->', user);
    getModel().findRecyclables(user.email, (err, entities) => {
      if (err) {
        next(err);
        return;
      }
      res.render('clientUI', { user: req.user, location: {}, recyclables: entities });
    });
    // res.render('clientUI', { user: req.user, location: {}, response: message, recyclables: {} });
  });


registerRouter.route('/driverUI')
  .all(function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  })
  .get((req, res) => {
    const user = req.user;
    getModel().listRecyclables((err, entities) => {
      if (err) {
        next(err);
        return;
      }
      res.render('driverUI', { user: req.user, location: {}, recyclables: entities });
    });
  });

registerRouter.route('/mapui/mylist')
  .all(function(req, res, next) {
    if (!req.user) {
      res.redirect('/');
    }
    next();
  })
  .get((req, res) => {
    res.render('myList', { user: req.user });
  });



module.exports = registerRouter;
