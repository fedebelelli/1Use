//const cors = require('cors');
//const authRoutes = require('../auth/auth.routes');
const express = require('express');
const router = express.Router()
const User = require('../auth/auth.model');
const nodemailer = require("nodemailer");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });
var fs = require('fs'); //Librería FileSystem para borrar archivos locales
var path = require('path'); //Modulo físico de NodeJS que nos permite cargar rutas físicas de nuestro sistema de archivos

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const db = "mongodb+srv://fede:1use@cluster0-pdt0d.mongodb.net/test?retryWrites=true&w=majority"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

mongoose.connect(db, { useNewUrlParser: true }, err => {

    if (err) {

        console.error('No se pudo conectar a la bd' + err)
    }
    else {

        console.log('Conectado a la bd en la nube')
    }
})

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "one.use.pf@gmail.com",
        pass: "1usemail",
    },
});

//Coniguración CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});



//const bodyParser = require('body-parser');
//const bodyParserJSON = bodyParser.json();
//const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

//app.use(bodyParserJSON);
//app.use(bodyParserURLEncoded);

//app.use(cors());
//app.use('/api', router);
//authRoutes(router);

router.get('/', (req, res) => {

    res.send('From API route')

});

router.post('/register', (req, res) => {

    let userData = req.body;
    let user = new User(userData);
    user.confirmed = false;
    user.save((error, registeredUser) => {

        if (error) {
            //console.log(error)
            res.status(401).send("Error en base de datos. Probar nuevamente");
        } else {
            //jwt de usuario, enviar mail con ese token, y mail con redireccion
            let payload = { subject: registeredUser.email }
            jwt.sign(payload, 'secretKey',
                {
                    expiresIn: '1d',
                },
                (err, token) => {
                    const url = 'http://localhost:4200/confirmacionemail/' + token;
                    transporter.sendMail({
                        to: userData.email,
                        subject: 'Confirma tu Email para terminar tu registro en OneUse',
                        html: 'Gracias por registrarte en OneUse. Para Confirmar tu email, por favor, haz click en este <a href="' + url + '">link' + '</a>',
                    });
                },
            );
            res.status(200).send(true);
        }

    })

})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({ email: userData.email }, (error, user) => {

        if (error) {
            console.log(error)
        }
        else {

            if (!user) {
                res.status(401).send('Datos incorrecto')
            }
            else {
                if (user.password !== userData.password) {
                    res.status(401).send('Datos incorrectos')
                }
                else {
                    if (!user.confirmed) {
                        res.status(401).send('Tu usuario no ha sido validado. Verifica tu casilla de e-mail')
                    }
                    else {
                        let payload = { subject: user._id }
                        let token = jwt.sign(payload, 'secretKey')
                        res.status(200).send({ token })
                    }
                }
            }
        }
    })
})

router.post('/confirmation', (req, res) => {
    try {
        let email = jwt.verify(req.body.token, 'secretKey').subject;
        User.findOne({ email: email }, (error, user) => {
            if (error) {
                console.log(error)
            }
            else {
                user.confirmed = true;
                user.save();
                res.status(200).send(true);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(401).send();
    }

});

router.get('/user-data', function (req, res) {
    let params = req.query.email;
    User.findOne({ email: params }, (error, user) => {
        if (error) {
            console.log("No pasa nada che")
        }
        else {
            res.status(200).send(user);
        }
    })
});

router.post('/update-user', multipartMiddleware, function (req, res) {

    var params = req.query.id;
    var user = req.body;
    var usuario = new User();

    usuario._id = params;
    usuario.apellido = user.apellido;
    usuario.ciudad = user.ciudad;
    usuario.direccion = user.direccion;
    usuario.fecha_nacimiento = user.fecha_nacimiento;
    usuario.nombre = user.nombre;
    usuario.provincia = user.provincia;
    //usuario.removablefile = user.removablefile._fileNames;
    usuario.telefono = user.telefono;

    User.findByIdAndUpdate(params, usuario, { new: true }, (err, pUpdated) => {
        if (err) return res.status(500).send("Error en BD");
        if (!pUpdated) return res.status(500).send("Error en BD");
        return res.status(200).send("Datos guardados correctamente");
    });
})

router.post('/upload-image/:id', multipartMiddleware, function (req, res) {

    var projectId = req.params.id;
    var fileName = "asd";

    if (req.files) {

        var filePath = req.files.removablefile.path;
        var fileSplit = filePath.split('\\');
        var fileName = fileSplit[1];

        User.findByIdAndUpdate(projectId, { removablefile: fileName }, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({ message: 'Imagen no subida' });
            if (!projectUpdated) return res.status(400).send({ message: 'No existe' });
            return res.status(200).send("Todo legal")
        })
    } else console.log("ERROR")
});

router.get('/get-image/:id', function (req, respuesta1) {
    var usuario = req.params.id; //Nombre de archivo enviado como parámetro en la URL
    User.findById(usuario, (err, res) => {

        var path_file = './uploads/' + res.removablefile; //Ubicación del archivo

        fs.exists(path_file, (exists) => {
            if (exists) {
                return respuesta1.sendFile(path.resolve(path_file));
            }
            else {
                return respuesta1.status(400).send("No existe la imagen");
            }
        })
    });
});


module.exports = router;