const express = require('express');
const Garden = require('../models/garden');
const User = require('../models/user');
const router = express.Router();

router.route('/api/users/:userID/gardens')
    .get((req,res) => {
        Garden.find({owned_by: req.params.userID}, function(err, gardens){
            if (err) { return next(err); }
            if(gardens.length == 0){
                return res.status(404).json({"message":"No gardens found"})
            }
            res.status(200).json({"GARDENS OF THE USER": gardens});
        })
    })
    .post((req,res) => {
        const garden = new Garden(req.body);  
        garden.save(function(err){
            if (err){
                return res.status(400).json({ "error" : err.message});
            }
        });
        User.findOneAndUpdate(
            { _id: req.params.userID }, 
            { $push: { gardens: garden} }, function(err, user){
                if(err){ return next(err) }
                user.save();
                res.status(201).json(garden);
            }
        );
    })
    .delete((req,res)=> {
        Garden.deleteMany({user: req.params.userID}, function(err,gardens){
            if(err){ return next(err);}
            res.status(200).json({
                "message": "ALL GARDENS DELETED SUCCESSFULLY"
            })
        })
    })

router.route('/api/users/:userID/gardens/:gardenID')
    .get((req,res) => {
        Garden.findById(req.params.gardenID, function(err, garden){
            if(garden == null){
                return res.status(404).json({"message": "GARDEN NOT FOUND"});
            }
            if(err){ return next(err);}
            res.status(200).json(garden);
        })
    })
    .put((req,res) => {
        Garden.findById(req.params.gardenID, function(err, garden){
            if(garden == null){
                return res.status(404).json({"message": "GARDEN NOT FOUND"});
            }
            if(err){ return next(err);}
            garden.size = req.body.size;
            garden.soillevel = req.body.soillevel;
            garden.direction = req.body.direction;
            garden.noplants = req.body.noplants; //update it to count on plant id
            garden.save();
            res.status(200).json(garden);
        })
    })
    .patch((req,res) => {
        Garden.findById(req.params.gardenID, function(err, garden){
            if(garden == null){
                return res.status(404).json({"message": "GARDEN NOT FOUND"});
            }
            if(err){ return next(err);}          
            garden.size = (req.body.size || garden.size);
            garden.soillevel = (req.body.soillevel || garden.soillevel);
            garden.direction = (req.body.direction || garden.direction);
            garden.noplants = (req.body.noplants || garden.noplants); //update it to count on plant id
            garden.save();
            res.status(200).json(garden);
        })
    })
    .delete((req,res)=> {
        Garden.findOneAndDelete({_id: req.params.gardenID}, function(err, garden){
            if(garden == null){
                return res.status(404).json({"message": "GARDEN NOT FOUND"});
            }
            if(err) { return next(err);}
            res.status(200).json(garden);
        })
    })

module.exports = router;