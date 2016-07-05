var chai = require('chai');
var chaiHttp = require('chai-http');

global.environment = 'test';
var server = require('../server.js');
var Item = require('../models/item');
var seed = require('../db/seed');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        seed.run(function() {
            done();
        });
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});

var Item = require('../models/item');

exports.run = function(callback) {
    Item.create({name: 'Broad beans'},
                {name: 'Tomatoes'},
                {name: 'Peppers'}, function(err, items) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, items);
    });
};

if (require.main === module) {
    require('./connect');
    exports.run(function(err) {
        if (err) {
            console.error(err);
            return;
        }
        var mongoose = require('mongoose');
        mongoose.disconnect();
    });
}