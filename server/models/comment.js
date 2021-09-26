const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    comment_content : { type : String },
    date_posted : { type : String },
    posted_by : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    ad : {
        type : Schema.Types.ObjectId,
        ref : "Ad"
    }
});

module.exports = mongoose.model('Comment', commentSchema, 'comments');