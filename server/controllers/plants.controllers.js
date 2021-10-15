const Plant = require('../models/plant');
const Garden = require('../models/garden');




const getAllPlantsInGarden = (req,res,next) => {
    if(req.query.sort){
        if(req.query.sort === "asc"){
            Plant.find({garden: req.params.gardenID}, function(err, plants){
                if (err) { return next(err); }
                if(plants.length == 0){
                    return res.status(404).json({"message":"No plants with that name found"})
                }
                return res.status(200).json({"plants": plants});
            }).sort({plant_name: 1}).populate('tips');
        }
        if(req.query.sort === "desc"){
            Plant.find({garden: req.params.gardenID}, function(err, plants){
                if (err) { return next(err); }
                if(plants.length == 0){
                    return res.status(404).json({"message":"No plants with that name found"})
                }
                return res.status(200).json({"plants": plants});
            }).sort({plant_name: -1}).populate('tips');
        }
    } else {
        Plant.find({garden: req.params.gardenID}, function(err, plants){
            if (err) { return next(err); }
            res.status(200).json({"plants": plants});
        }).populate('tips');
    }
    }

const createPlantInGarden = (req,res,next) => {
    const plant = new Plant(req.body); 
   Garden.findOneAndUpdate(
        { _id: req.params.gardenID }, 
        { $push: { plants: plant} }, function(err, garden){
            if(err){ return next(err) }
            if(garden == null){
                return res.status(404).json({"message": "Garden not found"})
            }
            plant.save(function(err){
                if(err){
                   return res.status(400).json({"error": err.message});
                }
            });
        
            res.status(201).json(plant);
        }
    );
    }

const deleteAllPlantsInGarden = (req,res,next) => {
    Plant.deleteMany({garden: req.params.gardenID}, function(err,plants){
        if(err){ return next(err);}
        res.status(200).json({
            "message": "Deletion of plants successful"
        })
    })
    }

const getPlant = (req,res,next) => {
    Plant.findById(req.params.plantID, function(err, plant){
        if(plant == null){
            return res.status(404).json({"message": "Plant not found"});
        }
        if(err){ return next(err);}
        res.status(200).json({"plant": plant});
    }).populate('tips');
    }

const fullyUpdatePlant = (req,res,next) => {
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
    }

const partialUpdatePlant = (req,res,next) => {
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
    }

 const deletePlant = (req,res,next)=> {
    Plant.findOneAndDelete({_id: req.params.plantID}, function(err, plant){
        if(err) { return next(err);}

        if(plant == null){
            return res.status(404).json({"message": "Plant not found"});
        }
        plant.remove()
        res.status(200).json(plant);
    } )
    }


module.exports = {getAllPlantsInGarden, createPlantInGarden, deleteAllPlantsInGarden, getPlant, fullyUpdatePlant, partialUpdatePlant, deletePlant };
