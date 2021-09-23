const Tip = require('../models/tip');
const Plant = require('../models/plant');


const getAllTips = (req,res,next) => {
        Tip.find(function(err, tips){
            if (err) { return next(err); }
            res.json({"tips": tips});
        })
    }

const deleteAllTips = (req,res,next)=> {
        Tip.deleteMany(function(err, tips){
            if(err){ return next(err);}
            res.json({
                "message": "Deletion of tips successful"
            })
        })
    }



const getAllTipsOnPlant = (req,res,next) => {
        Tip.find({plant: req.params.plantID}, function(err, tips){
            if (err) { return next(err); }
            res.json({"tips on a plant in a garden": tips});
        })
    }
const createTipOnPlant = (req,res,next)=> {
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
    }
    
const deleteAllTipsOnPlant = (req,res,next)=> {
        Tip.deleteMany({plant:req.params.plantID}, function(err, tips){
            if(err){ return next(err);}
            res.json({
                "message": "Deletion of tips successful"
            })
        })
    }

const getTip = (req,res,next) => {
        Tip.findById(req.params.tipID, function(err, tip){
            if(err){ return next(err);}

            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }
            res.json(tip);
        })
    }

const fullyUpdateTip = (req,res,next) => {
        Tip.findById(req.params.tipID, function(err, tip){
            if(err){ return next(err);}

            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }
            tip.title = req.body.title;
            tip.content = req.body.content;
            tip.save();
            res.json(tip);
        })
    }

const partialUpdateTip = (req,res,next) => {
        // Partially update a tip within a plant within a garden
        Tip.findById(req.params.tipID, function(err, tip){
            if(err){ return next(err);}

            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }
            tip.title = ( req.body.title  || tip.title );
            tip.content = (req.body.content || tip.content);
            tip.save();
            res.json(tip);
        })
    }

const deleteTip = (req,res,next)=> {
        Tip.findOneAndDelete({_id: req.params.tipID}, function(err, tip){
            if(tip == null){
                return res.status(404).json({"message": "Tip not found"});
            }

            if(err) { return next(err);}
        
            res.json(tip);
        } )
    }


module.exports = {getAllTips, deleteAllTips, getAllTipsOnPlant, createTipOnPlant, deleteAllTipsOnPlant, getTip, fullyUpdateTip, partialUpdateTip, deleteTip};