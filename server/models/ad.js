var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adSchema = new Schema ({
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

module.exports = mongoose.model('ads', adSchema);