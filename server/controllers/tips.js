const express = require('express');
const Tip = require('../models/tip');
const Plant = require('../models/plant');
const router = express.Router();


router.route('/api/gardens/:gardenID/plants/:plantID/tips')
    .get((req,res) => {
        // View all tips within a plant within a garden
        Tip.find({plant: req.params.plantID}, function(err, tips){
            if (err) { return next(err); }
            res.json({"tips on a plant in a garden": tips});
        })
    })
    .post((req,res)=> {
        // Create a new tip within a plant within a garden
        const tip = new Tip(req.body);
        tip.save();

        Plant.findOneAndUpdate(
            { _id: req.params.plantID }, 
            { $push: { tips: tip} }, function(err, plant){
                if(err){ return next(err) }
                plant.save();
                res.status(201).json(tip);
            }
        )
    })
    .delete((req,res)=> {
        // Delete all tips within a plant within a garden
        Tip.deleteMany({plant:req.params.plantID}, function(err, tips){
            if(err){ return next(err);}
            res.json({
                "message": "Deletion of tips successful"
            })
        })
    })

    router.route('/api/gardens/:gardenID/plants/:plantID/tips/:tipID')
    .get((req,res) => {
        // View a tip within a plant within a garden
        Tip.findById(req.params.tipID, function(err, tip){
            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }
            if(err){ return next(err);}
            res.json(tip);
        })
    })
    .put((req,res) => {
        // Update a tip within a plant within a garden
        Tip.findById(req.params.tipID, function(err, tip){
            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }
            if(err){ return next(err);}
            tip.title = req.body.title;
            tip.content = req.body.content;
            tip.save();
            res.json(tip);
        })
    })
    .patch((req,res) => {
        // Partially update a tip within a plant within a garden
        Tip.findById(req.params.tipID, function(err, tip){
            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }
            if(err){ return next(err);}
            tip.title = ( req.body.title  || tip.title );
            tip.content = (req.body.content || tip.content);
            tip.save();
            res.json(tip);
        })
    })
    .delete((req,res)=> {
        // Delete a tip within a plant within a garden
        Tip.findOneAndDelete({_id: req.params.tipID}, function(err, tip){
            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }

            if(err) { return next(err);}
        
            res.json(tip);
        } )
    })


module.exports = router;