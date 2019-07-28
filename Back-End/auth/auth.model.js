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
    },

    nombre: {
        type: String,
        required: true,
        defaultValue: false
    },

    apellido: {
        type: String,
        required: false,
        defaultValue: false
    },

    fecha_nacimiento: {
        type: Date,
        required: false,
        defaultValue: false
    },

    telefono: {
        type: String,
        required: false,
        defaultValue: false
    },

    direccion: {
        type: String,
        required: false,
        defaultValue: false
    },

    ciudad: {
        type: String,
        required: false,
        defaultValue: false
    },

    provincia: {
        type: String,
        required: false,
        defaultValue: false
    }

}, {

        timestamps: true

    });

module.exports = mongoose.model('user', userSchema, 'users');