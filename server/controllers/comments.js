const express = require('express');
const Comment = require('../models/comment');
const Ad = require('../models/ad');
const router = express.Router();

router.route('/api/comments')
.get((req, res, next) => {
    Comment.find( function(err, comments){
        if (err) { return next(err); }
        res.status(200).json({ "Comments in an ad" : comments })
    })
})

.delete((req, res, next) => {
    Comment.deleteMany(function(err, comments) {
        if(err) { return next(err); }
        res.status(200).json( { "message" : "Deletion of comments successful"})
    })
})


router.route('/api/users/:userID/ads/:adID/comments')
.get((req, res, next) => {
    Comment.find({ad: req.params.adID}, function(err, comments){
        if (err) { return next(err); }
        res.status(200).json({"Comments of an ad": comments});
    })
})

.post((req, res, next) => {
    const comment = new Comment(req.body);
    comment.save();

    Ad.findOneAndUpdate(
        { _id : req.params.adID },
        { $push : { comments : comment } }, function(err, ad){
            if (err){ return next(err) }
            ad.save();
            res.status(201).json(comment);
        }
    )
})

.delete((req, res, next)=> {
    Comment.deleteMany({ ad:req.params.adID }, function(err, comments){
        if(err){ return next(err); }
        res.status(200).json({
            "message": "Deletion of comments successful"
        })
    })
})


router.route('/api/users/:userID/ads/:adID/comments/:commentID')
.get((req, res, next) => {
    Comment.findById(req.params.commentID, function (err, comment){
        if (err) { return next(err); }
        if (comment == null){
            return res.status(404).json({ "message" : "Comment not found"});
        }
        res.status(200).json(comment);
    })
})

.put ((req, res, next) => {
    Comment.findById(req.params.commentID, function(err, comment){
        if (err) { return next(err); }
        if (comment == null){
            return res.status(404).json({ "message" : "Comment not found"});
        }
        comment.comment_content = req.body.comment_content;
        comment.date_posted = req.body.date_posted;
        comment.save();
        res.status(200).json(comment);
    })
})

.patch((req, res, next) => {
    Comment.findById(req.params.commentID, function(err, comment) {
        if (err) { return next(err); }
        if (comment == null){
            return res.status(404).json({ "message" : "Comment not found" });
        }
        comment.comment_content = (req.body.comment_content || comment.comment_content);
        comment.date_posted = (req.body.date_posted || comment.date_posted);
        comment.save();
        res.status(200).json(comment);
    })
})

.delete((req, res, next)=> {
    Comment.findOneAndDelete({_id: req.params.commentID}, function(err, comment){
        if(err) { return next(err); }
        if(comment == null){
            return res.status(404).json({"message": "Comment not found"});
        }
    
        res.status(200).json(comment);
    } )
})

module.exports = router;