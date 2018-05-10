/* jshint esversion: 6 */
/* jshint node: true */


'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Datastore = require('@google-cloud/datastore');
const ds = Datastore({
  projectId: 'cleangreen-198621'
});

function getModel() {
  return require('../../datastore/model-datastore');
}

module.exports = function() {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    const queryDriver = ds.createQuery('Driver')
        .filter('email', '=', email)
        .filter('password', '=', password);

    ds.runQuery(queryDriver).then(results => {
      const users = results[0];
      if (users[0]) {
        var user = users[0];
        done(null, user);
      } else {
        done(null, false, { message: 'Wrong Credentials' });
      }
    });
  }));
};
