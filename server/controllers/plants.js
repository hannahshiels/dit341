const express = require('express');
const Plant = require('../models/plant');
const Garden = require('../models/garden');
const router = express.Router();

router.route('/api/gardens/:gardenID/plants')
    .get((req,res,next) => {
        // View all plants within a garden

        if(req.query.sort){
            if(req.query.sort === "asc"){
                Plant.find({garden: req.params.gardenID}, function(err, plants){
                    if (err) { return next(err); }
                    if(plants.length == 0){
                        return res.status(404).json({"message":"No plants with that name found"})
                    }
                    return res.status(200).json({"plants in a garden": plants});
                }).sort({plant_name: 1}).populate('tips');
            }
            if(req.query.sort === "desc"){
                Plant.find({garden: req.params.gardenID}, function(err, plants){
                    if (err) { return next(err); }
                    if(plants.length == 0){
                        return res.status(404).json({"message":"No plants with that name found"})
                    }
                    return res.status(200).json({"plants in a garden": plants});
                }).sort({plant_name: -1}).populate('tips');
            }
        } else {
            Plant.find({garden: req.params.gardenID}, function(err, plants){
                if (err) { return next(err); }
                res.status(200).json({"plants in a garden": plants});
            }).populate('tips');
        }
    })
    .post((req,res,next) => {
        // Create a plant
        const plant = new Plant(req.body);  
        plant.save(function(err){
            if(err){
               return res.status(400).json({"error": err.message});
            }
        });

       Garden.findOneAndUpdate(
            { _id: req.params.gardenID }, 
            { $push: { plants: plant} }, function(err, garden){
                if(err){ return next(err) }
                if(garden == null){
                    return res.status(404).json({"message": "Garden not found"})
                }
                res.status(201).json(plant);
            }
        ); 
    })
    .delete((req,res,next)=> {
        // Delete all plants within a garden
        Plant.deleteMany({garden: req.params.gardenID}, function(err,plants){
            if(err){ return next(err);}
            res.status(200).json({
                "message": "Deletion of plants successful"
            })
        })
    })

router.route('/api/gardens/:gardenID/plants/:plantID')
    .get((req,res,next) => {
        // View a plant within a garden
        Plant.findById(req.params.plantID, function(err, plant){
            if(plant == null){
                return res.status(404).json({"message": "Plant not found"});
            }
            if(err){ return next(err);}
            res.status(200).json(plant);
        }).populate('tips');
    })
    .put((req,res,next) => {
        // Update a plant within a garden
        Plant.findById(req.params.plantID, function(err, plant){
            if(plant == null){
                return res.status(404).json({"message": "Plant not found"});
            }
            if(err){ return next(err);}
            plant.plant_description.img = req.body.plant_description.img;
            plant.plant_description.description = req.body.plant_description.description;
            plant.water_schedule = req.body.water_schedule;
            plant.fertilizer_schedule = req.body.fertilizer_schedule;
            plant.plant_name = req.body.plant_name;
            plant.save();
            res.status(200).json(plant);
        })
    })
    .patch((req,res,next) => {
        // Partially update a plant within a garden
        Plant.findById(req.params.plantID, function(err, plant){
            if(err){ return next(err);}

            if(plant == null){
                return res.status(404).json({"message": "Plant not found"});
            }
            plant.plant_description.img = ( req.body.plant_description.img  || plant.plant_description.img );
            plant.plant_description.description = (req.body.plant_description.description || plant.plant_description.description );
            plant.water_schedule = (req.body.water_schedule || plant.water_schedule);
            plant.fertilizer_schedule = (req.body.fertilizer_schedule || plant.fertilizer_schedule );
            plant.plant_name = (req.body.plant_name || plant.plant_name);
            plant.save();
            res.status(200).json(plant);
        })
    })
    .delete((req,res,next)=> {
        // Delete a plant within a garden
        Plant.findOneAndDelete({_id: req.params.plantID}, function(err, plant){
            if(err) { return next(err);}

            if(plant == null){
                return res.status(404).json({"message": "Plant not found"});
            }

        
            res.status(200).json(plant);
        } )
    })

module.exports = router;