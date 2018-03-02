'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        var user = {
            email: email,
            password: password
        };
        done(null, user);
    }));
};
