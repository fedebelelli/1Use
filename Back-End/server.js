const express = require('express');
const bodyParser = require('body-parser');
const PORT = 4201;
const api = require('./routes/api');
const app = express();
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

app.use('/api', api)

app.get('/', function(req, res) {

    res.send('Hello from server')

});


app.listen(PORT, function(){

    console.log('Servidor corriendo en puerto ' +PORT)

})


