const Garden = require('../models/garden');
const User = require('../models/user');

const getAllGardens = (req,res,next) => {
    Garden.find(function(err, users){
        if (err) { return next(err); }
        if(gardens.length == 0){
            return res.status(404).json({ "message" : "No gardens found"})
        }
        res.status(200).json({"LIST OF GARDENS": gardens});
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
        res.status(200).json({"GARDENS OF THE USER": gardens});
    })
    }

const createUserGarden = (req,res,next) => {
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
    }

const deleteUserGardens =  (req,res,next)=> {
    Garden.deleteMany({owned_by: req.params.userID}, function(err,gardens){
        if(err){ return next(err);}
        res.status(200).json({
            "message": "ALL GARDENS DELETED SUCCESSFULLY"
        })
    })
    }

const getGarden = (req,res,next) => {
    Garden.findById(req.params.gardenID, function(err, garden){
        if(garden == null){
            return res.status(404).json({"message": "GARDEN NOT FOUND"});
        }
        if(err){ return next(err);}
        res.status(200).json(garden);
    })
    }

const fullyUpdateGarden = (req,res,next) => {
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
    }

const partialUpdateGarden = (req,res,next) => {
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
    }

const deleteGarden = (req,res,next)=> {
    Garden.findOneAndDelete({_id: req.params.gardenID}, function(err, garden){
        if(garden == null){
            return res.status(404).json({"message": "GARDEN NOT FOUND"});
        }
        if(err) { return next(err);}
        res.status(200).json(garden);
    })
    }

module.exports = { getUserGardens, createUserGarden, deleteUserGardens, getGarden, fullyUpdateGarden, partialUpdateGarden, deleteGarden };