/* jshint esversion: 6 */
/* jshint node: true */


'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', '**/*.js'];

gulp.task('serve', () => {
    var options = {
        script: 'app.js',
        delayTime: 1,
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', (ev) => {
            console.log('restarting...');
        });
});
