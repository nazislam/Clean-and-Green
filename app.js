/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const config = require('./config/config');
const port = process.env.PORT || config.get("PORT");

const registerRouter = require('./register/register');
const pickupRouter = require('./pickup/pickup');
const recyclablesRouter = require('./recyclables/recyclables');

pickupRouter.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);
app.use(express.static('./public'));
app.set('views', './public/views');
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
require('./config/passport')(app);

app.use('/register', registerRouter);
app.use('/pickup', pickupRouter);
app.use('/recyclables', recyclablesRouter);


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/home', (req, res) => {
    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/signin', (req, res) => {
    res.render('signIn');
});

/*
router.get('/mapui', (req, res) => {
  console.log(req.user);
    res.render('mapui', { user: req.user });
});
*/

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('*', function(req, res){
  res.render('error');
});

app.listen(port, (req, res) => {
    console.log('Running ON PORT:' + port);
});
