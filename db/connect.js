/*
Contains logic for connecting to the database. You will require
this anywhere you require a database.

connects to mongoose
*/
var mongoose = require('mongoose');
var env = require('../environment');
var config = require('./config'); //connect to our own config

mongoose.connect(config[env].url);
/*
connects to config
*/


//connecting to env, which is passed as a string