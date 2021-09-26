const express = require('express');
const Ad = require('../models/ad');
const User = require('../models/user');
const router = express.Router();

router.route('/api/users/:userID/ads')
.get((req, res, next) => {
    Ad.find({uploaded_by: req.params.userID}, function(err, ads){
        if (err) { return next(err); }
        if(ads.length == 0){
            return res.status(404).json({ "message" : "No ads found"})
        }
        res.status(200).json({"ads of a user" : ads });
    })
})

.post((req, res, next) => {
    const ad = new Ad(req.body);
    ad.save(function(err){
        if (err){
            return res.status(400).json({ "error" : err.message});
        }
    });

    User.findOneAndUpdate(
        { _id: req.params.userID },
        { $push: { ads : ad } }, function (err, user){
            if (err) { return next(err) }
            if (user == null){
                return res.status(404).json({ "message" : "User not found" })
            }
            res.status(201).json(ad);
        }
    );
})

.delete((req, res, next) => {
    Ad.deleteMany({ uploaded_by : req.params.userID }, function(err, ads){
        if (err) { return next(err);}
        res.status(200).json({ "message" : "Deletion of ads successful"})
    })
})

router.route('/api/users/:userID/ads/:adID')
.get((req, res, next) => {
    Ad.findById(req.params.adID, function(err, ad) {
        if (ad == null){
            return res.status(404).json({ "message" : "Ad not found" });
        }
        if (err) { return next(err);}
        res.status(200).json(ad);
    })
})

.put((req, res, next) => {
    Ad.findById(req.params.adID, function(err, ad){
        if (ad == null){
            return res.status(404).json({ "message" : "Ad not found"});
        }
        if (err) {return next (err);}
        ad.ad_contact.number = req.body.ad_contact.number;
        ad.ad_contact.address = req.body.ad_contact.address;
        ad.ad_description = req.body.ad_description;
        ad.ad_type = req.body.ad_type;
        ad.ad_date_posted = req.body.ad_date_posted;
        ad.save();
        res.status(200).json(ad);
    })
})

.patch((req, res, next) => {
    Ad.findById(req.params.adID, function (err, ad){
        if (ad == null){
            return res.status(404).json({ "message" : "Ad not found"});
        }
        if (err) {return next(err);}
        ad.ad_contact.number = (req.body.ad_contact.number || ad.ad_contact.number);
        ad.ad_contact.address = (req.body.ad_contact.address || ad.ad_contact.address);
        ad.ad_description = (req.body.ad_description || ad.ad_description);
        ad.ad_type = (req.body.ad_type || ad.ad_type);
        ad.ad_date_posted = (req.body.ad_date_posted || ad.ad_date_posted);
        ad.save();
        res.status(200).json(ad);
    })
})

.delete((req, res, next) => {
    Ad.findOneAndDelete({ _id : req.params.adID}, function(err, ad){
        if (err) { return next(err); }
        if (ad == null){
            return res.status(404).json({ "message" : "Ad not found"});
        }

        res.status(200).json(ad);
    })
})

module.exports = router;