const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    tips: [{
        type: Schema.Types.ObjectId,
        ref: 'Tip'
    }]
});

module.exports = mongoose.model('Plant', plantSchema, 'plants');

