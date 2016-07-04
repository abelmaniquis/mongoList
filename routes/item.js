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

router.put('/items',function(req,res){
    Item.put(req.body.name, function(err,item){
        if(err){
            return res.status(400).json(err);
        }
        res.json(item);
    })
});

router.delete('/items',function(req,res){
    Item.delete(req.body.name,function(err,item){
        if (err){
            return res.status(400).json(err);
        }
        res.json(item);
    })    
});

module.exports = router;