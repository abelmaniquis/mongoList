This project is organized into directories:

db/
  Contains all database related files.

models/
  Contains data models, i.e item model.

services/
  Contains the logic of the API. 

routes/
  Contains logic for mapping endpoints to service calls.
  This separates HTTP logic from model logic.

server.js
  Brings everything together by loading the database configuration.

environment.js
  Enables us to specify an environment when starting the application.
  
  We can set the environment from within the application with global.environment
  or we can specify it as an environment folder
  
  this code goes into environment.js:
  
  module.exports = global.environment || process.env.NODE_ENV || 'development';
  
-----------------------------------------------------
FILE CONTENTS
----------------------------------------------------
db/config.json:

{
    "production": {
        "url": "mongodb://localhost/shopping-list"
    },
    "test": {
        "url": "mongodb://localhost/shopping-list-test"
    },
    "development": {
        "url": "mongodb://localhost/shopping-list-dev"
    }
}

db/connect.js:
You will require this everywhere you need to connect to the database.


var mongoose = require('mongoose');
var env = require('../environment');
var config = require('./config');

mongoose.connect(config[env].url);


models/item.js

var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
  name: {type: String, required: true}
});
var Item = mongoose.model('Item',ItemSchema)

module.exports = Item;

-------------------------------------------------------------------
services/item.js:

Here, you create two functions, save and list, which add and fetch items
from the database. Each function takes an error-first callback function
as an argument.

var Item = require('../models/item');

exports.save = function(name, callback) {
    Item.create({ name: name }, function(err, item) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, item);
    });
};

exports.list = function(callback) {
    Item.find(function(err, items) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, items);
    });
};
--------------------------------------------------------
routes/item.js

var express = require('express');
var Item = require('../services/item');
var router = express.Router();

router.get('/items', function(req, res) {
    Item.list(function(err, items) {
        if (err) {
            return res.status(400).json(err);
        }
        res.json(items);
    });
});

router.post('/items', function(req, res) {
    Item.save(req.body.name, function(err, item) {
        if (err) {
            return res.status(400).json(err);
        }
        res.status(201).json(item);
    });
});

module.exports = router;
---------------------------------------------------------------

server.js

require('./db/connect');
var express = require('express');
var bodyParser = require('body-parser');
var itemRoutes = require('./routes/item');
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/', itemRoutes);
app.use('*', function(req, res) {
    res.status(404).json({ message: 'Not Found' });
});

app.listen(8080, function() {
    console.log('Listening on port 8080');
});

exports.app = app;
# mongoList
