const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Plant = require('./plant')

const gardenSchema = new Schema({
    size: { type: String},
    soil_level: { type: String},
    direction: { type: String},
    no_plants: { type: String},
    img_link: { type: String },
    owned_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    plants: [{
        type: Schema.Types.ObjectId,
        ref: 'Plant'
    }]
});

gardenSchema.pre('remove', function(next) {
    Plant.remove({garden: this._id}).exec();
    next();
});

module.exports = mongoose.model('Garden', gardenSchema, 'gardens');