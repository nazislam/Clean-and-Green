'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Datastore = require('@google-cloud/datastore');
const ds = Datastore({
    projectId: 'clean-and-green'
})

module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        const query = ds.createQuery('User')
            .filter('email', '=', email)
            .filter('password', '=', password);
        
        ds.runQuery(query).then(results => {
            // User entities found.
            const users = results[0];

            console.log('User:');
            console.log(users[0]);
            if (users[0]) {
                var user = users[0];
                done(null, user);
            } else {
                done(null, false, { message: 'Wrong Credentials' });
                // done('Wrong credentials', null);
            }
            // users.forEach(user => console.log(user));
        });


//        var user = {
//            email: email,
//            password: password
//        };
//        done(null, user);
    }));
};
