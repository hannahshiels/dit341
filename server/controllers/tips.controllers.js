const Tip = require('../models/tip');
const Plant = require('../models/plant');
const User = require('../models/user')


const getAllTips = (req,res,next) => {
        Tip.find(function(err, tips){
            if (err) { return next(err); }
            if(tips.length == 0){
                return res.status(404).json({ "message" : "No tip found"})
            }
            res.status(200).json({"tips": tips});
        }).populate('plant author')
    }

const deleteAllTips = (req,res,next)=> {
    Tip.deleteMany(function(err, tips){
        if(err){ return next(err);}
        res.status(200).json({
            "message": "Deletion of tips successful"
        })
    })
    }



const getAllTipsOnPlant = (req,res,next) => {
    Tip.find({plant: req.params.plantID}, function(err, tips){
        if (err) { return next(err); }
        res.status(200).json({"tips on a plant in a garden": tips});
    })
    }
const createTipOnPlant = (req,res,next)=> {
    const tip = new Tip(req.body);


    Plant.findOneAndUpdate(
        { _id: req.params.plantID }, 
        { $push: { tips: tip} }, function(err, plant){
            if(err){ return next(err) }
            tip.save(function(err){
                if(err){
                   return res.status(400).json({"error": err.message});
                }
            });
            res.status(201).json(tip);
        }
    )
    }
    
const deleteAllTipsOnPlant = (req,res,next)=> {
    Tip.deleteMany({plant:req.params.plantID}, function(err, tips){
        if(err){ return next(err);}
        res.status(200).json({
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
        res.status(200).json(tip);
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
        res.status(200).json(tip);
    })
    }

const partialUpdateTip = (req,res,next) => {
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
    }

const deleteTip = (req,res,next)=> {
    Tip.findOneAndDelete({_id: req.params.tipID}, function(err, tip){
        if(tip == null){
            return res.status(404).json({"message": "Tip not found"});
        }

        if(err) { return next(err);}
    
        res.status(200).json(tip);
    } )
    }


module.exports = {getAllTips, deleteAllTips, getAllTipsOnPlant, createTipOnPlant, deleteAllTipsOnPlant, getTip, fullyUpdateTip, partialUpdateTip, deleteTip};