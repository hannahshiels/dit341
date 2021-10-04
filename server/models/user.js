const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;
const Garden = require('./garden')
const Ad = require('./ad')


const userSchema = new Schema({
    email: { type: String, unique: true},
    name: { type: String},
    dob: { type: String},
    role: { type: String},
    password: { type: String},
    address: { type: String},
    contact_number: { type: String},
    gardens: [{
        type: Schema.Types.ObjectId,
        ref: 'Garden'
    }],
    ads: [{
        type: Schema.Types.ObjectId,
        ref: 'Ad'
    }]
});

userSchema.plugin(uniqueValidator);

userSchema.methods.validPassword = function(password) {
    return this.password === password
};

userSchema.pre('remove', function(next) {
    Garden.remove({owned_by: this._id}).exec();
    Ad.remove({uploaded_by: this._id}).exec();
    next();
});

module.exports = mongoose.model('User', userSchema, 'users');