const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Tip = require('./tip')

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

plantSchema.pre('remove', function(next) {
    Tip.remove({plant: this._id}).exec();
    next();
});


module.exports = mongoose.model('Plant', plantSchema, 'plants');

