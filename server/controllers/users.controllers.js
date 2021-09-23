const User = require('../models/user');

const getAllUsers = (req,res) => {
        User.find(function(err, users){
            if (err) { return next(err); }
            res.json({"LIST OF USERS": users});
        })
    }

const createUser = (req,res) => {
        const user = new User(req.body);  
        user.save(function(err){
            if (err) { return next(err); }
            res.status(201).json(user);
        })
    }

const getUser = (req,res) => {
        User.findById(req.params.userID, function(err, user){
            if(user == null){
                return res.status(404).json({"message": "USER NOT FOUND"});
            }
            if(err){ return next(err);}
            res.json(user);
        })
    }

const fullyUpdateUser = (req,res) => {
        User.findById(req.params.userID, function(err, user){
            if(user == null){
                return res.status(404).json({"message": "USER NOT FOUND"});
            }
            if(err){ return next(err);}
            user.name = req.body.name;
            user.dob = req.body.dob;
            user.role = req.body.role;
            user.password = req.body.password;
            user.address = req.body.address;
            user.contactnumber = req.body.contactnumber;
            user.email = req.body.email;
            user.save();
            res.json(user);
        })
    }

const partialUpdateUser = (req,res) => {
        User.findById(req.params.userID, function(err, user){
            if(user == null){
                return res.status(404).json({"message": "USER NOT FOUND"});
            }
            if(err){ return next(err);}
            user.name = (req.body.name || user.name);
            user.dob = (req.body.dob || user.dob);
            user.role = (req.body.role || user.role);
            user.password = (req.body.password || user.password);
            user.address = (req.body.address || user.address);
            user.contactnumber = (req.body.contactnumber || user.contactnumber);
            user.email = (req.body.email || user.email);
            user.save();
            res.json(user);
        })
    }

const deleteUser = (req,res)=> {
        User.findOneAndDelete({_id: req.params.userID}, function(err, user){
            if(user == null){
                return res.status(404).json({"message": "USER NOT FOUND"});
            }
            if(err) { return next(err);}
            res.json(user);
        })
    }

module.exports = {getAllUsers, createUser, getUser, fullyUpdateUser, partialUpdateUser, deleteUser};