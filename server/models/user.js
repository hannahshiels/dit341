const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String},
    dob: { type: String},
    role: { type: String},
    password: { type: String},
    address: { type: String},
    contactnumber: { type: String},
    email: { type: String},
    gardens: [{
        type: Schema.Types.ObjectId,
        ref: 'Garden'
    }]
});

module.exports = mongoose.model('User', userSchema, 'users');