const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);
const reclamos = new Schema({
    id_publicacion: {
        type: String
    },
    usuario_reclamo: {
        type: String
    },

    tipo: {
        type: String
    }, 
    motivo: {
        type: String
    },
    intervencion: {
        type: Boolean,
    },
    
    
}, {
        timestamps: true
    });

module.exports = mongoose.model('reclamos', reclamos, 'reclamos');