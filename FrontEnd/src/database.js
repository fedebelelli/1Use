const mongoose = require('mongoose');
const { mongodb } = require('./keys') 

mongoose.connect('mongodb+srv://fede:1use@cluster0-pdt0d.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(db => console.log('La base de datos esta conectada'))
.catch(err => console.error(err));