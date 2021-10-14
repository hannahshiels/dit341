const Garden = require('../models/garden');
const User = require('../models/user');

const getAllGardens = (req,res,next) => {
    Garden.find(function(err, gardens){
        if (err) { return next(err); }
        if(gardens.length == 0){
            return res.status(404).json({ "message" : "No gardens found"})
        }
        res.status(200).json({"gardens": gardens});
    })
    }

const createGarden = (req,res,next) => {
    const garden = new Garden(req.body);  
    garden.save(function(err){
        if (err) { return next(err); }
        res.status(201).json(garden);
    })
    }

const getUserGardens = (req,res,next) => {
    Garden.find({owned_by: req.params.userID}, function(err, gardens){
        if (err) { return next(err); }
        if(gardens.length == 0){
            return res.status(404).json({"message":"No gardens found"})
        }
        res.status(200).json({"User_gardens": gardens});
    })
    }

const createUserGarden = (req,res,next) => {
    const garden = new Garden(req.body);  
    User.findOneAndUpdate(
        { _id: req.params.userID }, 
        { $push: { gardens: garden} }, function(err, user){
            if(err){ return next(err) }
            if(user == null){
                return res.status(404).json({"message": "User not found"})
            }
            garden.save(function(err){
                if (err){
                    return res.status(400).json({ "error" : err.message});
                }
            });
            res.status(201).json(garden);
        }
    );
    }

const deleteUserGardens =  (req,res,next)=> {
    Garden.deleteMany({owned_by: req.params.userID}, function(err,gardens){
        if(err){ return next(err);}
        res.status(200).json({
            "message": "All gardens deleted successfully."
        })
    })
    }

const getGarden = (req,res,next) => {
    Garden.findById(req.params.gardenID, function(err, garden){
        if(garden == null){
            return res.status(404).json({"message": "Garden not found"});
        }
        if(err){ return next(err);}
        res.status(200).json(garden);
    })
    }

const fullyUpdateGarden = (req,res,next) => {
    Garden.findById(req.params.gardenID, function(err, garden){
        if(garden == null){
            return res.status(404).json({"message": "Garden not found"});
        }
        if(err){ return next(err);}
        garden.size = req.body.size;
        garden.soil_level = req.body.soil_level;
        garden.direction = req.body.direction;
        garden.no_plants = req.body.no_plants; //update it to count on plant id
        garden.img_link = req.body.img_link;
        garden.save();
        res.status(200).json(garden);
    })
    }

const partialUpdateGarden = (req,res,next) => {
    Garden.findById(req.params.gardenID, function(err, garden){
        if(garden == null){
            return res.status(404).json({"message": "GARDEN NOT FOUND"});
        }
        if(err){ return next(err);}          
        garden.size = (req.body.size || garden.size);
        garden.soil_level = (req.body.soil_level || garden.soil_level);
        garden.direction = (req.body.direction || garden.direction);
        garden.no_plants = (req.body.no_plants || garden.no_plants); //update it to count on plant id
        garden.img_link = (req.body.img_link || garden.img_link);
        garden.save();
        res.status(200).json(garden);
    })
    }

const deleteGarden = (req,res,next)=> {
    Garden.findOneAndDelete({_id: req.params.gardenID}, function(err, garden){
        if(garden == null){
            return res.status(404).json({"message": "GARDEN NOT FOUND"});
        }
        if(err) { return next(err);}
        garden.remove()
        res.status(200).json(garden);
    })
    }

const deleteAllGardens = (req,res,next)=> {
        Garden.deleteMany(function(err, gardens){
            if(gardens == null){
                return res.status(404).json({"message": "GARDEN NOT FOUND"});
            }
            if(err) { return next(err);}
            res.status(200).json(gardens);
        })
}

module.exports = { getUserGardens,getAllGardens, createGarden, createUserGarden, deleteUserGardens, getGarden, fullyUpdateGarden, partialUpdateGarden, deleteGarden, deleteAllGardens };
