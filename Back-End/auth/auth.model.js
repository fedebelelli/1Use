const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const userSchema = new Schema({

    name: {

        type: String,
        required: true,
        trim: true

    },


    email: {

        type: String,
        required: true,
        trim: true,
        unique: true
    },

    password: {

        type: String,
        required: true,
        trim: true

    },

    confirmed: {

        type: Boolean,
        required: true,
        defaultValue: false

    }





}, {

        timestamps: true

    });

module.exports = mongoose.model('user', userSchema, 'users');