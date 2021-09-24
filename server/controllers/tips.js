const express = require('express');
const Tip = require('../models/tip');
const Plant = require('../models/plant');
const router = express.Router();


router.route('/api/tips')
    .get((req,res,next) => {
        // View all tips
        Tip.find(function(err, tips){
            if (err) { return next(err); }
            if(tips.length == 0){
                return res.status(404).json({ "message" : "No tip found"})
            }
            res.status(200).json({"tips": tips});
        })
    })
    .delete((req,res,next)=> {
        // Delete all tips
        Tip.deleteMany(function(err, tips){
            if(err){ return next(err);}
            res.status(200).json({
                "message": "Deletion of tips successful"
            })
        })
    })



router.route('/api/gardens/:gardenID/plants/:plantID/tips')
    .get((req,res,next) => {
        // View all tips within a plant within a garden
        Tip.find({plant: req.params.plantID}, function(err, tips){
            if (err) { return next(err); }
            res.status(200).json({"tips on a plant in a garden": tips});
        })
    })
    .post((req,res,next)=> {
        // Create a new tip within a plant within a garden
        const tip = new Tip(req.body);
        tip.save(function(err){
            if(err){
               return res.status(400).json({"error": err.message});
            }
        });

        Plant.findOneAndUpdate(
            { _id: req.params.plantID }, 
            { $push: { tips: tip} }, function(err, plant){
                if(err){ return next(err) }
                plant.save();
                res.status(201).json(tip);
            }
        )
    })
    .delete((req,res,next)=> {
        // Delete all tips within a plant within a garden
        Tip.deleteMany({plant:req.params.plantID}, function(err, tips){
            if(err){ return next(err);}
            res.status(200).json({
                "message": "Deletion of tips successful"
            })
        })
    })

    router.route('/api/gardens/:gardenID/plants/:plantID/tips/:tipID')
    .get((req,res,next) => {
        // View a tip within a plant within a garden
        Tip.findById(req.params.tipID, function(err, tip){
            if(err){ return next(err);}

            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }
            res.status(200).json(tip);
        })
    })
    .put((req,res,next) => {
        // Update a tip within a plant within a garden
        Tip.findById(req.params.tipID, function(err, tip){
            if(err){ return next(err);}

            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }
            tip.title = req.body.title;
            tip.content = req.body.content;
            tip.save();
            res.status(200).json(tip);
        })
    })
    .patch((req,res,next) => {
        // Partially update a tip within a plant within a garden
        Tip.findById(req.params.tipID, function(err, tip){
            if(err){ return next(err);}

            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }
            tip.title = ( req.body.title  || tip.title );
            tip.content = (req.body.content || tip.content);
            tip.save();
            res.status(200).json(tip);
        })
    })
    .delete((req,res,next)=> {
        // Delete a tip within a plant within a garden
        Tip.findOneAndDelete({_id: req.params.tipID}, function(err, tip){
            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }

            if(err) { return next(err);}
        
            res.status(200).json(tip);
        } )
    })


module.exports = router;