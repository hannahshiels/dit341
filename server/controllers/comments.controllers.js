const Comment = require('../models/comment');
const Ad = require('../models/ad');

const getAllComments = (req, res, next) => {
    Comment.find( function(err, comments){
        if (err) { return next(err); }
        if(comments.length == 0){
            return res.status(404).json({ "message" : "No comments found"})
        }
        res.status(200).json({ "Comments in an ad" : comments })
    })
}

const deleteAllComments = (req, res, next) => {
    Comment.deleteMany(function(err, comments) {
        if(err) { return next(err); }
        res.status(200).json( { "message" : "Deletion of comments successful"})
    })
}


const getAllCommentsOnAd = (req, res, next) => {
    Comment.find({ad: req.params.adID}, function(err, comments){
        if (err) { return next(err); }
        res.status(200).json({"Comments of an ad": comments});
    })
}

const createComment = (req, res, next) => {
    const comment = new Comment(req.body);
    comment.save(function(err){
        if(err){
           return res.status(400).json({"error": err.message});
        }
    });

    Ad.findOneAndUpdate(
        { _id : req.params.adID },
        { $push : { comments : comment } }, function(err, ad){
            if (err){ return next(err) }
            if(ad == null){
                return res.status(404).json({"message": "Ad not found"})
            }
            ad.save();
            res.status(201).json(comment);
        }
    )
}

const deleteAllCommentsOnAd = (req, res, next)=> {
    Comment.deleteMany({ ad:req.params.adID }, function(err, comments){
        if(err){ return next(err); }
        res.status(200).json({
            "message": "Deletion of comments successful"
        })
    })
}


const getComment = (req, res, next) => {
    Comment.findById(req.params.commentID, function (err, comment){
        if (err) { return next(err); }
        if (comment == null){
            return res.status(404).json({ "message" : "Comment not found"});
        }
        res.status(200).json(comment);
    })
}

const fullyUpdateComment = (req, res, next) => {
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
}

const partialUpdateComment = (req, res, next) => {
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
}

const deleteComment = (req, res, next)=> {
    Comment.findOneAndDelete({_id: req.params.commentID}, function(err, comment){
        if(err) { return next(err); }
        if(comment == null){
            return res.status(404).json({"message": "Comment not found"});
        }
    
        res.status(200).json(comment);
    } )
}

module.exports = {getAllComments, deleteAllComments, getAllCommentsOnAd, createComment, deleteAllCommentsOnAd, getComment, fullyUpdateComment, partialUpdateComment, deleteComment  };