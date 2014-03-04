'use strict';

// Module dependencies.
var express = require('express'),
    fs = require('fs'),
    passport = require('passport'),
    path = require('path');

// Load configurations
var env = process.env.NODE_ENV || 'development'
    , config = require('./lib/config/config')[env]
    , auth = require('./lib/config/middleware/authorization');

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// bootstrap passport config
require('./lib/config/passport')(passport, config);

var app = express();

// Connect to database
var db = require('./lib/db/mongo');
// Populate empty DB with dummy data
require('./lib/db/dummydata');

// express settings
var rootDir = __dirname;
require('./lib/config/express')(app, config, passport, rootDir);

// Bootstrap routes
require('./lib/config/routes')(app, passport, auth);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});