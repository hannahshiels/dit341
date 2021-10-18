const Ad = require('../models/ad');
const User = require('../models/user');

const getAllAds = (req,res,next) => {
    Ad.find(function(err, ads){
        if (err) { return next(err); }
        if(ads.length == 0){
            return res.status(404).json({ "message" : "No ad found"})
        }
        res.status(200).json({ "ads": ads });
    })
}

const deleteAllAds = (req,res,next)=> {
    Ad.deleteMany(function(err, ads){
    if(err){ return next(err);}
    res.status(200).json({
        "message": "Deletion of ads successful"
    })
})
}

const getSpecificAd = (req, res, next) => {
    Ad.findById(req.params.adID, function(err, ad) {
        if (ad == null){
            return res.status(404).json({ "message" : "Ad not found" });
        }
        if (err) { return next(err);}
        res.status(200).json({"ad": ad});
    }).populate('uploaded_by comments')
}

const getUserAds = (req, res, next) => {
    Ad.find({uploaded_by: req.params.userID}, function(err, ads){
        if (err) { return next(err); }
        if(ads.length == 0){
            return res.status(404).json({ "message" : "No ads found"})
        }
        res.status(200).json({"ads" : ads });
    })
}


const createUserAd = (req, res, next) => {
    const ad = new Ad(req.body);

    User.findOneAndUpdate(
        { _id: req.params.userID },
        { $push: { ads : ad } }, function (err, user){
            if (err) { return next(err) }
            if (user == null){
                return res.status(404).json({ "message" : "User not found" })
            }
            ad.save(function(err){
                if (err){
                    return res.status(400).json({ "error" : err.message});
                }
            });
            res.status(201).json(ad);
        }
    );

}

const deleteUserAds = (req, res, next) => {
    Ad.deleteMany({ uploaded_by : req.params.userID }, function(err, ads){
        if (err) { return next(err);}
        res.status(200).json({ "message" : "Deletion of ads successful"})
    })
}

const getUserAd = (req, res, next) => {
    Ad.findById(req.params.adID, function(err, ad) {
        if (ad == null){
            return res.status(404).json({ "message" : "Ad not found" });
        }
        if (err) { return next(err);}
        res.status(200).json(ad);
    })
}

const fullUpdateUserAd = (req, res, next) => {
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
}

const partialUpdateUserAd = (req, res, next) => {
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
}

const deleteUserAd = (req, res, next) => {
    Ad.findOneAndDelete({ _id : req.params.adID}, function(err, ad){
        if (err) { return next(err); }
        if (ad == null){
            return res.status(404).json({ "message" : "Ad not found"});
        }
        ad.remove()
        res.status(200).json(ad);
    })
}

module.exports = { getAllAds, deleteAllAds, getSpecificAd, getUserAds, createUserAd,deleteUserAds,  getUserAd, fullUpdateUserAd, partialUpdateUserAd,  deleteUserAd  };
