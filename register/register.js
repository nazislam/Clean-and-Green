'use strict';

const express = require('express');
const registerRouter = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const validator = require('express-validator');
const {check, validationResult} = require('express-validator/check');

function getModel() {
    return require('./model-datastore');
}

registerRouter.use(bodyParser.json());
registerRouter.use(bodyParser.urlencoded({ extended: false }));
registerRouter.use(validator());

registerRouter.route('/').get((req, res) => {
    res.render('../views/register');
});

registerRouter.route('/').post((req, res) => {
    console.log(req.body);
    req.login(req.body, () => {
        const data = req.body;
        getModel().create(data);

        res.redirect('/register/profile');
    });
});

registerRouter.route('/signIn').post(
    passport.authenticate('local', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/register/profile');
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
        res.render('profile', { user: req.user });
});

module.exports = registerRouter;
