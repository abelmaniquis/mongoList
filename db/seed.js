var Item = require('../models/item');
/*Seed usually denotes some kind of dummy data*/
exports.run = function(callback){
  Item.create({name: 'Broad Beans'},
              {name:'Tomatoes'},
              {name: 'Peppers'},function(err,items){
          if (err){
            callback(err);
            return;
          }
          callback(null, items);
    });
};

if (require.main === module){
  require('./connect');
  exports.run(function(err){
    if(err){
      console.error(err);
      return;
    }
    var mongoose = require('mongoose');
    mongoose.disconnect();
  });
}