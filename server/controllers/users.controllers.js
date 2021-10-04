const User = require('../models/user');

const getAllUsers = (req,res,next) => {
    User.find(function(err, users){
        if (err) { return next(err); }
        if(users.length == 0){
            return res.status(404).json({ "message" : "No users found"})
        }
        res.status(200).json({"users": users});
    })
    }

const createUser = (req,res,next) => {
    const user = new User();  
    user.name = req.body.name;
    user.dob = req.body.dob;
    user.role = req.body.role;
    user.password = req.body.password;
    user.address = req.body.address;
    user.contact_number = req.body.contact_number;
    user.email = req.body.email;
    user.save(function(err){
        if (err) {return next(err); }
        res.status(201).json(user);
    })
    }

const deleteUsers = (req,res,next)=> {
        User.deleteMany( function(err, users){
            if(users == null){
                return res.status(404).json({"message": "USER NOT FOUND"});
            }
            if(err) { return next(err);}
            res.status(200).json(users);
        })
}

const getUser = (req,res,next) => {
    User.findById(req.params.userID, function(err, user){
        if(user == null){
            return res.status(404).json({"message": "User not found"});
        }
        if(err){ return next(err);}
        res.status(200).json(user);
    })
    }

const fullyUpdateUser = (req,res,next) => {
    User.findById(req.params.userID, function(err, user){
        if(user == null){
            return res.status(404).json({"message": "User not found"});
        }
        if(err){ return next(err);}
        user.name = req.body.name;
        user.dob = req.body.dob;
        user.role = req.body.role;
        user.password = req.body.password;
        user.address = req.body.address;
        user.contact_number = req.body.contact_number;
        user.email = req.body.email;
        user.save();
        res.status(200).json(user);
    })
    }

const partialUpdateUser = (req,res,next) => {
    User.findById(req.params.userID, function(err, user){
        if(user == null){
            return res.status(404).json({"message": "User not found"});
        }
        if(err){ return next(err);}
        user.name = (req.body.name || user.name);
        user.dob = (req.body.dob || user.dob);
        user.role = (req.body.role || user.role);
        user.password = (req.body.password || user.password);
        user.address = (req.body.address || user.address);
        user.contact_number = (req.body.contact_number || user.contact_number);
        user.email = (req.body.email || user.email);
        user.save();
        res.status(200).json(user);
    })
    }

const deleteUser = (req,res,next)=> {
    User.findOneAndDelete({_id: req.params.userID}, function(err, user){
        if(user == null){
            return res.status(404).json({"message": "User not found"});
        }
        if(err) { return next(err);}
        user.remove()
        res.status(200).json(user);
    })
    }

module.exports = {getAllUsers, createUser, getUser, fullyUpdateUser, partialUpdateUser, deleteUser,deleteUsers};