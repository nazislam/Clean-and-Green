'use strict';

const express = require('express');               // Importing express
const app = express();                            // An instance of express app
const bodyParser = require('body-parser');
const router = express.Router();                  // An instance of express router to work with routes
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

const registerRouter = require('./register/register');
const dropoffRouter = require('./dropoff/crud');

dropoffRouter.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);                           // Apply the routes to our application
app.use(express.static('./public'));            // Providing 'public' directory as static
app.set('views', './public/views');             // Sets the location to find templates for routes
app.set('view engine', 'pug');                  // Sets Pug as template engine for the app

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
require('./config/passport')(app);

app.use('/register', registerRouter);
app.use('/dropoff', dropoffRouter);

const port = process.env.PORT | 5000;

router.get('/', (req, res) => {
    res.redirect('/register');
})

router.get('/register', (req, res) => {                 // GET method on path '/'
    res.render('register');                     // Rendering homepage.pug as temaplate for path '/'
})

router.get('/signin', (req, res) => {           // Get method on path '/signin'
    res.render('signIn');                       // Rendering signIn.pug as template for path 'signin'
})
router.get('/mapui', (req, res) => {           // Get method on path '/mapui'
    res.render('mapui');                       // Rendering mapui.pug as template for path 'mapui'
})
router.get('/mymap', (req, res) => {           // Get method on path '/mymap'
    res.render('mymap');                       // Rendering mapui.pug as template for path 'mymap'
})




/***** Listening to port 5000  **/
app.listen(port, (req, res) => {
    console.log('Running ON PORT:' + port);
});
