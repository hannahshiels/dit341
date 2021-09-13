const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./user');
// const Garden = require('./garden');

const plantSchema = new Schema({
    plant_name: { type: String},
    plant_description: {type: []},
    water_schedule: { type: []},
    fertilizer_schedule: { type: []},
    owned_by: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    garden: {
        type: Schema.Types.ObjectId,
        ref: "Garden"
    }
});

module.exports = mongoose.model('Plant', plantSchema, 'plants');

