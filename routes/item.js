/*
Contains logic for mapping endpoints to service calls. This
separates HTTP logic from the model logic.
*/

/*
Line 15, and line 24, what are these methods?
*/

/*
We are using mongoose in this code
Not using the MongoDB driver
Use the mongoose page.

http://mongoosejs.com/docs/models.html
*/

var express = require('express');                   //These are all mongoose models
var Item = require('../services/item');
var router = express.Router();

//Query the database, and return all of the items in the database
router.get('/items', function(req, res) {
    //mongoose methods
    Item.list(function(err, items){ 
        if (err) {
            return res.status(400).json(err);
        }
        console.log(items);
        res.json(items);
    });
});

router.post('/items', function(req, res) {
    Item.save(req.body.name, function(err, item) {
        if (err) {
            return res.status(400).json(err);
        }
        console.log(req.body.name);
        res.status(201).json(item);
    });
});

/*
Use update
*/
router.put('/items',function(req,res){
    Item.update(req.body.name,function(err,item){
       if(err){
           return res.status(400).json(err);
       }
       console.log(item);
       res.status(201).json(item);
    });
});

/*
Use the remove function

remove the item with the name req.body.name

FBFriendModel.find({ id:333 }).remove().exec();
*/
router.delete('/items',function(req,res){
    Item.remove(req.body.name,function(err,item){
        if(!err){
            console.log("Okay");
        }
        else{
            console.log("Error");
        }
        res.status(201).json(item);
    });
});

module.exports = router;