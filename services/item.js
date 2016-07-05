/*
Contains the logic of the API.Here you have logic that includes
multiple models interacting with eachother.
*/

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


/*
This function handles the json object
*/

exports.list = function(callback) {
    Item.find(function(err, items) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, items);
    });
};