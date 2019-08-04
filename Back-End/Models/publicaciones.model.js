const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const publicacionesSchema = new Schema({

    titulo: {
        type: String,
    },

    categoria: {
        type: String,
    },

    subcategoria: {
        type: String,
    },

    descripcion: {
        type: String,
    },

    preciodia: {
        type: number,
    },

    preciosemana: {
        type: number,
    },

    preciomes: {
        type: number,
    },

    foto: {
        type: String,
    },

    email: {
        type: String,
    },
}, {
        timestamps: true
    });

module.exports = mongoose.model('publicaciones', publicacionesSchema, 'publicaciones');