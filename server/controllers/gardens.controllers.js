const Garden = require('../models/garden');
const User = require('../models/user');

const getUserGardens = (req,res) => {
        Garden.find({user: req.params.userID}, function(err, gardens){
            if (err) { return next(err); }
            res.json({"GARDENS OF THE USER": gardens});
        })
    }

const createUserGarden = (req,res) => {
        const garden = new Garden(req.body);  
        garden.save();
        User.findOneAndUpdate(
            { _id: req.params.userID }, 
            { $push: { gardens: garden} }, function(err, user){
                if(err){ return next(err) }
                res.status(201).json(garden);
            }
        );
    }

const deleteUserGardens =  (req,res)=> {
        Garden.deleteMany({user: req.params.userID}, function(err,gardens){
            if(err){ return next(err);}
            res.json({
                "message": "ALL GARDENS DELETED SUCCESSFULLY"
            })
        })
    }

const getGarden = (req,res) => {
        Garden.findById(req.params.gardenID, function(err, garden){
            if(garden == null){
                return res.status(404).json({"message": "GARDEN NOT FOUND"});
            }
            if(err){ return next(err);}
            res.json(garden);
        })
    }

const fullyUpdateGarden = (req,res) => {
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
            res.json(garden);
        })
    }

const partialUpdateGarden = (req,res) => {
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
            res.json(garden);
        })
    }

const deleteGarden = (req,res)=> {
        Garden.findOneAndDelete({_id: req.params.gardenID}, function(err, garden){
            if(garden == null){
                return res.status(404).json({"message": "GARDEN NOT FOUND"});
            }
            if(err) { return next(err);}
            res.json(garden);
        })
    }

module.exports = { getUserGardens, createUserGarden, deleteUserGardens, getGarden, fullyUpdateGarden, partialUpdateGarden, deleteGarden };