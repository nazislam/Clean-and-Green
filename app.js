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
const recyclablesRouter = require('./recyclables/recyclables');
const listRouter = require('./list/list');
const mapRouter = require('./map/map');

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
app.use('/recyclables', recyclablesRouter);
app.use('/mapui/list', listRouter);
app.use('/register/mapui', mapRouter);

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
