const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment')

const adSchema = new Schema ({
    ad_description : { type : String },
    ad_type : { type : String },
    ad_contact : { type : [] },
    ad_date_posted : { type : String },
    uploaded_by : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    comments : [{
        type : Schema.Types.ObjectId,
        ref : "Comment"
    }]
});

adSchema.pre('remove', function(next) {
    Comment.remove({ad: this._id}).exec();
    next();
});

module.exports = mongoose.model('Ad', adSchema, 'ads');