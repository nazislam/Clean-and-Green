var express = require('express');               // Importing express
var app = express();                            // An instance of express app
var router = express.Router();                  // An instance of express router to work with routes



app.use('/', router);                           // Apply the routes to our application
app.use(express.static('./public'));            // Providing 'public' directory as static
app.set('views', './public/views');             // Sets the location to find templates for routes
app.set('view engine', 'pug');                  // Sets Pug as template engine for the app

const PORT = 3000;                              // App will listen to this port


router.get('/', (req, res) => {                 // GET method on path '/'
    res.render('homepage');                     // Rendering homepage.pug as temaplate for path '/'
})
router.get('/', (req, res) => {                 // GET method on path '/'
    res.render('registration');                     // Rendering registration.pug as temaplate for path '/'
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
router.get('/dropoff', (req, res) => {           // Get method on ath '/dropoff'
    res.render('dropoff');                       // Rendering mapui.pug as template for path 'dropoff'
})


/***** Listening to port 5000  **/
app.listen(PORT, (err) => {                             // Listening to the specified port
    console.log('Running server on port: ' + PORT);
})
