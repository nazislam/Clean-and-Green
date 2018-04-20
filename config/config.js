/* jshint esversion: 6 */
/* jshint node: true */


'use strict';

const path = require('path');
const nconf = require('nconf');

nconf.file({ file: path.join(__dirname, 'config.json') });

module.exports = nconf;
