const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gardenSchema = new Schema({
    size: { type: String},
    soil_level: { type: String},
    direction: { type: String},
    no_plants: { type: String},
    owned_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    plants: [{
        type: Schema.Types.ObjectId,
        ref: 'Plant'
    }]
});

module.exports = mongoose.model('Garden', gardenSchema, 'gardens');