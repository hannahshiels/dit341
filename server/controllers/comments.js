const express = require('express');
const Comment = require('../models/comment');
const Ad = require('../models/ad');
const router = express.Router();

router.route('/api/users/:userID/ads/:adID/comments')
.get((req, res) => {
    Comment.find({ ad : req.params.adID}, function(err, comments) {
        if (err) { return next(err); }
        res.json({ "Comments in an ad" : ads })
    })
})

.post((req, res) => {
    const comment = new Comment(req.body);
    comment.save();

    Ad.findOneAndUpdate(
        { _id : req.params.adID },
        { $push : { comments : comments } }, function(err, ad){
            if (err){ return next(err) }
            ad.save();
            res.status(201).json(comment);
        }
    )
})

.delete((req, res) => {
    Comment.deleteMany({ ads: req.params.adID}, function(err, comments) {
        if(err) { return next(err); }
        res.json( { "message" : "Deletion of comments successful"})
    })
})

router.route('/api/users/:userID/ads/:adID/comments/:commentID')
.get((req, res) => {
    Comment.findById(req.params.commentID, function (err, comment){
        if (comment == null){
            return res.status(404).json({ "message" : "Comment not found"});
        }
        if (err) { return next(err); }
        res.json(comment);
    })
})

.put ((req, res) => {
    Comment.findById(req.params.commentID, function(err, comment){
        if (comment == null){
            return res.status(404).json({ "message" : "Comment not found"});
        }
        if (err) { return next(err); }
        comment.content = req.body.content;
        comment.date_posted = req.body.date_posted;
        comment.save();
        res.json(comment);
    })
})

.patch((req, res) => {
    Comment.findById(req.params.commentID, function(err, comment) {
        if (comment == null){
            return res.status(404).json({ "message" : "Comment not found" });
        }
        if (err) { return next(err); }

        res.json(comment);
    })
})

module.exports = router;