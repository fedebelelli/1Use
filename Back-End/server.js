'use strict'

const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const app = express();
const db = require('./config/db');

db();

const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors());
app.use('/api', router);
authRoutes(router);

router.get('/', (req, res)=> {

    res.send('Hello !!')

});

app.listen(4200, ()=> console.log('Servidor corriendo en puerto 4200'));

app.use(router);

app.post('/iPost', function(req, res) {
    res.send('POST!!');
});