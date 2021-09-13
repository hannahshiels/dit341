const mongoose = require('mongoose');
// const User = require('./user');
const Plant = require('./plant');
const Schema = mongoose.Schema;

const tipSchema = new Schema({
    content: {type: String},
    date_posted: {type: Date},
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    plant: {
        type: Schema.Types.ObjectId,
        ref: "Plant"
    }
});

module.exports = mongoose.model('Tip', tipSchema, 'tips');

