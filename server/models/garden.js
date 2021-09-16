const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gardenSchema = new Schema({
    size: { type: String},
    soillevel: { type: String},
    direction: { type: String},
    noplants: { type: String},
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