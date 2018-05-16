/* jshint esversion: 6 */
/* jshint node: true */

'use strict';


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const config = require('./config/config');
const port = process.env.PORT || config.get("PORT");

const registerRouter = require('./register/register');
const pickupRouter = require('./pickup/pickup');
const processRouter = require('./process/process');

pickupRouter.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./public'));
app.set('views', './public/views');
app.set('view engine', 'pug');

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
require('./config/passport')(app);

app.use('/', router);
app.use('/register', registerRouter);
app.use('/pickup', pickupRouter);
app.use('/process', processRouter);

router.get('/', (req, res) => {
  if (req.user !== undefined) {
    if (req.user.userType === 'client') {
      res.redirect('register/clientUI');
    } else if (req.user.userType === 'driver') {
      res.redirect('register/driverUI');
    }
  } else {
    res.render('home');
  }
});

router.get('/home', (req, res) => {
  req.flash('loginFail', 'The email or password you have entered is invalid. Please try again.');
  res.redirect('/');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/signin', (req, res) => {
  res.render('signIn');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('*', function(req, res) {
  res.render('error');
});

app.listen(port, (req, res) => {
  console.log('server is running ON PORT:' + port);
});
