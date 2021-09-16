const express = require('express');
const Plant = require('../models/plant');
//const Garden = require('../models/garden');
const router = express.Router();

router.route('/api/gardens/:gardenID/plants')
    .get((req,res) => {
        // View all plants within a garden
        Plant.find({garden: req.params.gardenID}, function(err, plants){
            if (err) { return next(err); }
            res.json({"plants in a garden": plants});
        })
    })
    .post((req,res) => {
        // Create a plant
        const plant = new Plant(req.body);  
        plant.save();

        // need to delete this once garden is created
         res.status(201).json(plant);

        // uncomment this when garden is added
       /* Garden.findOneAndUpdate(
            { _id: req.params.gardenID }, 
            { $push: { plants: plant} }, function(err, garden){
                if(err){ return next(err) }
                garden.save();
                res.status(201).json(plant);
            }
        ); */
    })
    .delete((req,res)=> {
        // Delete all plants within a garden
        Plant.deleteMany({garden: req.params.gardenID}, function(err,plants){
            if(err){ return next(err);}
            res.json({
                "message": "Deletion of plants successful"
            })
        })
    })

router.route('/api/gardens/:gardenID/plants/:plantID')
    .get((req,res) => {
        // View a plant within a garden
        Plant.findById(req.params.plantID, function(err, plant){
            if(plant == null){
                return res.status(404).json({"message": "Plant not found"});
            }
            if(err){ return next(err);}
            res.json(plant);
        })
    })
    .put((req,res) => {
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
            res.json(plant);
        })
    })
    .patch((req,res) => {
        // Partially update a plant within a garden
        Plant.findById(req.params.plantID, function(err, plant){
            if(plant == null){
                return res.status(404).json({"message": "Plant not found"});
            }
            if(err){ return next(err);}
            plant.plant_description.img = ( req.body.plant_description.img  || plant.plant_description.img );
            plant.plant_description.description = (req.body.plant_description.description || plant.plant_description.description );
            plant.water_schedule = (req.body.water_schedule || plant.water_schedule);
            plant.fertilizer_schedule = (req.body.fertilizer_schedule || plant.fertilizer_schedule );
            plant.plant_name = (req.body.plant_name || plant.plant_name);
            plant.save();
            res.json(plant);
        })
    })
    .delete((req,res)=> {
        // Delete a plant within a garden
        Plant.findOneAndDelete({_id: req.params.plantID}, function(err, plant){
            if(plant == null){
                return res.status(404).json({"message": "Plant not found"});
            }

            if(err) { return next(err);}
        
            res.json(plant);
        } )
    })

module.exports = router;