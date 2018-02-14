var gulp = require('gulp');                     // Importing gulp
var nodemon = require('gulp-nodemon');          // Importing gulp-nodemon (a package to allow auto-refresh)

var jsFiles = ['*.js'];                         // list of files to watch for change


// A gulp task to auto-refresh server if there is any change detected
// In Terminal, do "gulp serve" instead of "npm start" to 
// let Gulp handle refreshing the server after every change
// It requires Gulp installed Globally
// do "sudo npm install -g gulp" to install it globally (with '-g' flag), 
// meaning now various 'gulp' command can be used in Terminal.
gulp.task('serve', () => {
    var options = {
        script: 'app.js',
        delayTime: 1,
        watch: jsFiles
    }
    return nodemon(options)
        .on('restart', (ev) => {
            console.log('restarting...');
        })
})
