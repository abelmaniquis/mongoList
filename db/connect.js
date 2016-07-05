/*
Contains logic for connecting to the database. You will require
this anywhere you require a database.
*/
var mongoose = require('mongoose');
var env = require('../environment');
var config = require('./config');

mongoose.connect(config[env].url);