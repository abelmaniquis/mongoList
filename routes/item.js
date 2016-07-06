/*
Contains logic for mapping endpoints to service calls. This
separates HTTP logic from the model logic.
*/

/*
Line 15, and line 24, what are these methods?
*/

var express = require('express');
var Item = require('../services/item');
var router = express.Router();

router.get('/items', function(req, res) {
    Item.list(function(err, items) { 
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
        console.log(item);
        res.status(201).json(item);
    });
});

router.put('/items',function(req,res){
    Item.put(req.body.name,function(err,item){
       if(err){
           return res.status(400).json(err);
       }
       console.log(item);
       res.status(201).json(item);
    });
});

router.delete('/items',function(req,res){
    Item.delete(req.body.name,function(err,items){
        if (err){
            return res.status(400).json(err);
        }
        var i = res.id
        items.splice(items[i],1)
        res.status(200).json(items);
    })    
});

module.exports = router;