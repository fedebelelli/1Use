/* -------------------------- Configuración general ------------------------------- */
const express = require('express');
const router = express.Router()
const nodemailer = require("nodemailer");
var moment = require('moment');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require("dotenv").config();
//const db = "mongodb+srv://fede:1use@cluster0-pdt0d.mongodb.net/test?retryWrites=true&w=majority"
const db = "mongodb+srv://federico:1usebasededatos$@cluster1-zogz0.azure.mongodb.net/test?retryWrites=true&w=majority"
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });
var multipartMiddlewarePublicaciones = multipart({ uploadDir: './publicaciones' });
var fs = require('fs'); //Librería FileSystem para borrar archivos locales
var path = require('path'); //Modulo físico de NodeJS que nos permite cargar rutas físicas de nuestro sistema de archivos
var randomstring = require("randomstring"); //Generador de números alfanumericos random
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/* ----------------------------------- MODELOS ----------------------------------- */
const User = require('../auth/auth.model');
const Publicacion = require('../Models/publicaciones.model');
const PyR = require('../Models/pyr.model');
const Notificacion = require('../Models/notificaciones.model');
const MisAlquileres = require('../Models/mis-alquileres.model');

/* ---------------------------- Métodos de configuración ------------------------- */
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
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: "one.use.pf@gmail.com",
        pass: "1usemail",
    },
});

//const bodyParser = require('body-parser');
//const bodyParserJSON = bodyParser.json();
//const bodyParserURLEncoded = bodyParser.urlencoded({extended: true});

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));

const cors = require("cors");
app.use(cors());
//app.use('/api', router);
//authRoutes(router);

/* ------------------------------ Rutas de usuarios ----------------------------------- */
router.get('/', (req, res) => {

    res.send('From API route')

});

router.post('/register', (req, res) => {

    let userData = req.body;
    let user = new User(userData);
    user.password = bcrypt.hashSync(user.password);
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
                        from: 'one.use.pf@gmail.com',
                        to: userData.email,
                        subject: 'Confirma tu Email para terminar tu registro en OneUse',
                        /* html: '<h1>Gracias por registrarte en OneUse</h1> <br> Para Confirmar tu email, por favor, haz click en este <a href="' + url + '">link' + '</a>', */
                        html: `
                        <!DOCTYPE html>
                        <html lang="es">
                        <head>
                            <meta charset="utf-8">
                            <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
                        </head>

                        <body>
                        <section style="background-color: #4a70af;">
                        <div style="text-align: center;">
                          <img style="padding-top:20px;width: 150px; height: 100px;margin-bottom: 20px;" src="http://oneuseprimerdeploy.s3-website-sa-east-1.amazonaws.com/assets/images/E3.png">
                        </div>
                      
                        <section style="width: 95%;height: 100%;background-color: white;box-sizing: border-box;padding: 5px; text-align:justify; padding-bottom:10px; margin:0 auto">
                      
                          <h2 style="text-align:center !important"> ¡Estás a un paso de finalizar tu registro!</h2>
                          <h3>¡Hola `+ userData.name + `!</h3>
                          <p> Gracias por confiar en OneUse. Con el fin de ayudar a mantener la seguridad de tu cuenta, por favor, verifica tu dirección de email. </p>
                      
                          <div style="text-align:center !important;">
                            <a style="
                                                  line-height: 40px;
                                                  padding: 0 40px;
                                                  border-radius: 20px;
                                                  background: transparent;
                                                  border: 1px solid #ffd60f;
                                                  display: inline-block;
                                                  font-weight: 450;
                                                  -webkit-transition: all 0.3s ease 0s;
                                                  -moz-transition: all 0.3s ease 0s;
                                                  -o-transition: all 0.3s ease 0s;
                                                  transition: all 0.3s ease 0s;
                                                  cursor: pointer;
                                                  outline: none;
                                                  margin-top: 20px;
                                                  margin-bottom: 20px;
                                                  margin-left: 14px;
                                                  background: #4a70af;
                                                  text-decoration: none;
                                                  color: #fff;
                                                  box-shadow: 0px 10px 20px 0px rgba(60, 64, 143, 0.2);
                                                  " href="`+ url + `">Verificar email</a>
                          </div>
                          <p>
                            Verificar tu dirección de email te permitirá cambiar las credenciales de tu cuenta de OneUse, utilizar confirmaciones de intercambio y del Mercado y recuperar el acceso a tu cuenta de OneUse en caso de que lo pierdas u olvides tu contraseña.
                          </p>
                          <br>
                          <p>
                            Gracias por ayudarnos a mantener la seguridad de tu cuenta.
                          </p>
                      
                          <p style="font-style: italic">
                            El equipo de OneUse
                          </p>
                      
                        </section>
                        <br><br><br>
                      </section>
                      
                        </body>
                        </html>
                        `,
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
                const compa = bcrypt.compareSync(userData.password, user.password);
                if (!compa) {
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
    usuario.nombre = user.nombre;
    usuario.apellido = user.apellido;
    usuario.codArea = user.codArea;
    usuario.telefono = user.telefono;
    usuario.fecha_nacimiento = user.fecha_nacimiento;
    usuario.provincia = user.provincia;
    usuario.ciudad = user.ciudad;
    usuario.barrio = user.barrio;
    //usuario.removablefile = user.removablefile._fileNames;
    usuario.calle = user.calle;
    usuario.numero = user.numero;
    usuario.piso = user.piso;
    usuario.departamento = user.departamento;
    usuario.codigoPostal = user.codigoPostal;

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

/* ------------------------------ Rutas de publicaciones ----------------------------------- */
router.post('/register-publicacion', function (req, res) {
    var email = req.query.email;
    var datos = req.body;
    var publicaciones = new Publicacion();

    publicaciones.titulo = datos.titulo;
    publicaciones.categoria = datos.categoria;
    publicaciones.subcategoria = datos.subcategoria;
    publicaciones.descripcion = datos.descripcion;
    publicaciones.preciodia = datos.preciodia;
    publicaciones.preciosemana = datos.preciosemana;
    publicaciones.preciomes = datos.preciomes;
    publicaciones.email = email;
    publicaciones.multiplefile = null;
    publicaciones.tipoAlquiler = datos.tipoAlquiler;
    publicaciones.destacar = datos.destacar;
    publicaciones.estado = 'ACTIVA'
    publicaciones.id = datos.id;

    publicaciones.save((err, res1) => {
        if (err) return res.status(500).send("Error papi");
        if (!res) return res.status(404).send("Error papi");



        const url = 'http://localhost:4200/publicaciones/' + publicaciones.id;
        transporter.sendMail({
            from: 'one.use.pf@gmail.com',
            to: publicaciones.email,
            subject: 'Su publicacion ha sido publicada exitosamente',
            html: `
                        <!DOCTYPE html>
                        <html lang="es">
                        <head>
                            <meta charset="utf-8">
                            <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
                        </head>

                        <body>
                        <section style="background-color: #4a70af;">
                        <div style="text-align: center;">
                          <img style="padding-top:20px;width: 150px; height: 100px;margin-bottom: 20px;" src="http://oneuseprimerdeploy.s3-website-sa-east-1.amazonaws.com/assets/images/E3.png">
                        </div>
                      
                        <section style="width: 95%;height: 100%;background-color: white;box-sizing: border-box;padding: 5px; text-align:justify; padding-bottom:10px; margin:0 auto">
                      
                          <h2 style="text-align:center !important"> Tu producto ha sido publicado</h2>
                         
                          <p> Para ver tu publicacion, haz click en el siguiente link </p>
                      
                          <div style="text-align:center !important;">
                            <a style="
                                                  line-height: 40px;
                                                  padding: 0 40px;
                                                  border-radius: 20px;
                                                  background: transparent;
                                                  border: 1px solid #ffd60f;
                                                  display: inline-block;
                                                  font-weight: 450;
                                                  -webkit-transition: all 0.3s ease 0s;
                                                  -moz-transition: all 0.3s ease 0s;
                                                  -o-transition: all 0.3s ease 0s;
                                                  transition: all 0.3s ease 0s;
                                                  cursor: pointer;
                                                  outline: none;
                                                  margin-top: 20px;
                                                  margin-bottom: 20px;
                                                  margin-left: 14px;
                                                  background: #4a70af;
                                                  text-decoration: none;
                                                  color: #fff;
                                                  box-shadow: 0px 10px 20px 0px rgba(60, 64, 143, 0.2);
                                                  " href="`+ url + `">Ir a la publicacion</a>
                          </div>
                          
                          <br>
                          <p>
                            Gracias por elegirnos
                          </p>
                      
                          <p style="font-style: italic">
                            El equipo de OneUse
                          </p>
                      
                        </section>
                        <br><br><br>
                      </section>
                      
                        </body>
                        </html>
                        `,

        });


        return res.status(200).send("todo legal papi");
    })

})

router.post('/upload-publicacion-img/:email/:titulo/:categoria', multipartMiddlewarePublicaciones, function (req, res) {

    var email = req.params.email;
    var titulo = req.params.titulo;
    var categoria = req.params.categoria;
    var fileName = "asd";

    if (req.files) {
        let nombre = "";
        let nombreFinal;
        if (req.files.multiplefile.length == undefined) {
            var filePath = req.files.multiplefile.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            nombre += '{"imagen0":' + '"' + fileName + '",'
            nombreFinal = nombre.slice(0, -1);
            nombreFinal += "}";
        } else {
            for (let i = 0; i < req.files.multiplefile.length; i++) {
                var filePath = req.files.multiplefile[i].path;
                var fileSplit = filePath.split('\\');
                var fileName = fileSplit[1];
                if (i == 0) nombre += '{"imagen' + i + '":' + '"' + fileName + '",'
                else nombre += '"imagen' + i + '":"' + fileName + '",';
            }
            nombreFinal = nombre.slice(0, -1);
            nombreFinal += "}";
        }

        Publicacion.findOneAndUpdate({ email: email, titulo: titulo, categoria: categoria }, { multiplefile: nombreFinal }, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({ message: 'Imagen no subida' });
            if (!projectUpdated) return res.status(400).send({ message: 'No existe' });
            return res.status(200).send({ message: "ok" })
        })

    } else console.log("ERROR")

});

router.get('/get-publicacion/:email', function (req, res) {
    var email = req.params.email;
    Publicacion.find({ email: email }).exec((err, publicaciones) => {

        if (err) return res.status(500).send({ message: 'Error' });

        if (!publicaciones) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ publicaciones });

    })
})

router.post('/update-publicacion/:id', multipartMiddlewarePublicaciones, function (req, res) {
    var id = req.params.id;
    var datos = req.body;
    var publicaciones = new Publicacion();

    publicaciones._id = id;
    publicaciones.titulo = datos.titulo;
    publicaciones.categoria = datos.categoria;
    publicaciones.subcategoria = datos.subcategoria;
    publicaciones.descripcion = datos.descripcion;
    publicaciones.preciodia = datos.preciodia;
    publicaciones.preciosemana = datos.preciosemana;
    publicaciones.preciomes = datos.preciomes;
    publicaciones.email = datos.email;
    //publicaciones.multiplefile = null;
    publicaciones.tipoAlquiler = datos.tipoAlquiler;
    publicaciones.destacar = datos.destacar;
    publicaciones.estado = datos.estado;


    Publicacion.findByIdAndUpdate(id, publicaciones, { new: true }, (err, eliminado) => {
        if (err) return res.status(500).send({ message: 'Error al eliminar' });

        if (!eliminado) return res.status(404).send({ message: 'Error' });

        return res.status(200).send({ message: "Todo ok" })

    })
})

router.delete('/delete-publicacion/:id', function (req, res) {
    var id = req.params.id;
    Publicacion.findByIdAndDelete(id, (err, eliminado) => {
        if (err) return res.status(500).send({ message: 'Error al eliminar' });

        if (!eliminado) return res.status(404).send({ message: 'Error' });

        return res.status(200).send({ message: "Todo ok" })

    })
})

router.get('/get-one-publicacion/:id', function (req, res) {
    var id = req.params.id;
    Publicacion.findById(id, (err, publicaciones) => {

        if (err) return res.status(500).send({ message: 'Error' });

        if (!publicaciones) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ publicaciones });

    })
})

router.get('/get-image-publicacion/:imagen', function (req, respuesta1) {
    var imagen = req.params.imagen; //Nombre de archivo enviado como parámetro en la URL

    var path_file = './publicaciones/' + imagen; //Ubicación del archivo

    fs.exists(path_file, (exists) => {
        if (exists) {
            return respuesta1.sendFile(path.resolve(path_file));
        }
        else {
            return respuesta1.status(400).send("No existe la imagen");
        }
    })
});

router.get('/get-publicaciones-destacadas', function (req, res) {
    Publicacion.find({ destacar: 'SI', estado: 'ACTIVA' }, (err, publicaciones) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!publicaciones) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ publicaciones });
    })
})




/* ------------------------------ Busqueda de publicaciones ----------------------------------- */
router.get('/search-categoria/:categoria', function (req, res) {
    var categoria = req.params.categoria;
    var preciodia = req.query.p;
    var estrellas = req.query.e;
    var subcategoria = req.query.s;

    var query;

    /*  c p e s
        1 0 0 0
        1 0 0 1
        1 0 1 0
        1 0 1 1
        1 1 0 0
        1 1 0 1
        1 1 1 1
    */

    /* URL EJEMPLO: http://localhost:4201/api/search-categoria/Hogar?p=300&s=Decoración */

    if (categoria != undefined && preciodia == undefined && estrellas == undefined && subcategoria == undefined) {
        query = Publicacion.find({ categoria: categoria, estado: 'ACTIVA' })
    }

    //1001
    if (categoria != undefined && preciodia == undefined && estrellas == undefined && subcategoria != undefined) {
        query = Publicacion.find({ categoria: categoria, subcategoria: subcategoria, estado: 'ACTIVA' })
    }

    //1010
    if (categoria != undefined && preciodia == undefined && estrellas != undefined && subcategoria == undefined) {
        query = Publicacion.find({ categoria: categoria, estrellas: estrellas, estado: 'ACTIVA' })
    }

    //1011
    if (categoria != undefined && preciodia == undefined && estrellas != undefined && subcategoria != undefined) {
        query = Publicacion.find({ categoria: categoria, estrellas: estrellas, subcategoria: subcategoria, estado: 'ACTIVA' })
    }

    //1100
    if (categoria != undefined && preciodia != undefined && estrellas == undefined && subcategoria == undefined) {
        query = Publicacion.find({ categoria: categoria, preciodia: preciodia, estado: 'ACTIVA' })
    }

    //1101
    if (categoria != undefined && preciodia != undefined && estrellas == undefined && subcategoria != undefined) {
        query = Publicacion.find({ categoria: categoria, preciodia: preciodia, subcategoria: subcategoria, estado: 'ACTIVA' })
    }

    //1110
    if (categoria != undefined && preciodia != undefined && estrellas != undefined && subcategoria == undefined) {
        query = Publicacion.find({ categoria: categoria, preciodia: preciodia, estrellas: estrellas, estado: 'ACTIVA' })
    }

    //1111
    if (categoria != undefined && preciodia != undefined && estrellas != undefined && subcategoria != undefined) {
        query = Publicacion.find({ categoria: categoria, preciodia: preciodia, estrellas: estrellas, subcategoria: subcategoria, estado: 'ACTIVA' })
    }


    query.exec((err, publicaciones) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ publicaciones });
    })
})


/* ------------------------------ Preguntas y respuestas ----------------------------------- */
//Get de las preguntas y respuestas de una publicación
router.get("/pyr/:id", function (req, res) {

    PyR.find({ id_publicacion: req.params.id }).exec((err, publicacion) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ publicacion });
    })
})


//Post del usuario cuando hace una pregunta (id = id del detalle de la publicación)
router.post("/pregunta/:id/:name", function (req, res) {

    var pregunta = req.body.pregunta;
    var id_publicacion = req.params.id;
    var usuario_pregunta = req.params.name;
    var objeto = { id_publicacion: id_publicacion, usuario_pregunta: usuario_pregunta, pregunta: pregunta }
    var modelo = new PyR(objeto);


    modelo.save((err, pyr) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ pyr });
    })
})

//Post de la respuesta del usuario que publicó (id = id de la pregunta que realizó el usuario interesado)
router.post("/respuesta/:idPyR/:name", function (req, res) {

    var respuesta = req.body.respuesta;
    var usuarioRespuesta = req.params.name;
    var id_publicacion = req.params.idPyR;
    var objeto = { usuario_publicacion: usuarioRespuesta, respuesta: respuesta, tiene_respuesta: true }

    PyR.findByIdAndUpdate(id_publicacion, objeto, (err, pyr) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ pyr });
    })
})

router.get("/onePyR/:id", function (req, res) {
    var _id = req.params.id;
    PyR.findById(_id, (err, pyr) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ pyr });
    })
})


/* ------------------------------ Notificaciones ----------------------------------- */
router.post("/notificacion-pregunta/:origen/:destino/:id_publicacion", function (req, res) {
    var id = req.params.id_publicacion;
    var titulo = "Nueva pregunta en ";
    var origen = req.params.origen;
    var destino = req.params.destino;
    var tipo = "pregunta";
    var mensaje = origen + " ha realizado una pregunta en tu publicación";

    var objeto = { id_publicacion: id, titulo: titulo, name_origen: origen, name_destino: destino, tipo: tipo, mensaje_notificacion: mensaje, visto: false }

    var notificacion = new Notificacion(objeto);

    notificacion.save((err, not) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ not });
    })

})

router.post("/notificacion-respuesta/:origen/:destino/:id_publicacion", function (req, res) {
    var id = req.params.id_publicacion;
    var titulo = "Nueva respuesta en ";
    var origen = req.params.origen;
    var destino = req.params.destino;
    var tipo = "respuesta";
    var mensaje = origen + " ha respondido a tu pregunta";

    var objeto = { id_publicacion: id, titulo: titulo, name_origen: origen, name_destino: destino, tipo: tipo, mensaje_notificacion: mensaje, visto: false }

    var notificacion = new Notificacion(objeto);

    notificacion.save((err, not) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ not });
    })

})

router.get("/nuevas-notificaciones/:username", function (req, res) {
    var name = req.params.username;

    Notificacion.find({ name_destino: name, visto: false }, (err, not) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ not });
    })
})

router.get("/todas-notificaciones/:username", function (req, res) {
    var name = req.params.username;

    Notificacion.find({ name_destino: name }, (err, not) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ not });
    })
})

router.post("/notificacion-vista", function (req, res) {
    var notificacion = req.body;

    Notificacion.findByIdAndUpdate(notificacion._id, { visto: true }, (err, not) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ not });
    })
})


/* ------------------------------ Mis alquileres ----------------------------------- */

//Test de generación de códigos
router.post('/codigo-alquiler', function (req, res) {
    res.status(200).send(randomstring.generate(10));
})

router.post('/registrar-alquiler/:id_publicacion/:usuarioPropietario/:usuarioLocatario/:cantidadDias/:cantidadAlquilar', function (req, res) {
    var estado = 'En proceso de pago';
    var id_publicacion = req.params.id_publicacion;
    var id_usuarioPropietario = req.params.usuarioPropietario;
    var id_usuarioLocatario = req.params.usuarioLocatario;
    var cantidadDias = req.params.cantidadDias;
    var cantidadAlquilar = req.params.cantidadAlquilar;

    var objeto = {
        estado: estado, id_publicacion: id_publicacion, id_usuarioPropietario: id_usuarioPropietario,
        id_usuarioLocatario: id_usuarioLocatario, cantidadDias: cantidadDias, cantidadAlquilar: cantidadAlquilar
    }

    var misAlquileres = new MisAlquileres(objeto);

    misAlquileres.save((err, alquiler) => {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ alquiler });
    })

})

router.post('/registrar-proceso-entrega/:id_publicacion', function (req, res) {
    var id_publicacion = req.params.id_publicacion;
    var estado = 'En proceso de entrega';
    var codigoEntregaPropietario = randomstring.generate(10);
    var codigoEntregaLocatario = randomstring.generate(10);
    var codigoPropietarioIngresado = false;
    var codigoLocatarioIngresado = false;
    var date = new Date();
    date.setDate(date.getDate() + 3) //DEFINIR LA CANTIDAD DE DÍAS EN EL QUE SE PUEDE TARDAR EN ENTREGAR EL PRODUCTO
    var fechaCaducidadEntrega = moment(date).format('DD/MM/YYYY');

    var objeto = {
        estado: estado, codigoEntregaPropietario: codigoEntregaPropietario, codigoEntregaLocatario: codigoEntregaLocatario,
        fechaCaducidadEntrega: fechaCaducidadEntrega, codigoPropietarioIngresado: codigoPropietarioIngresado, codigoLocatarioIngresado: codigoLocatarioIngresado
    }

    MisAlquileres.findOneAndUpdate({ id_publicacion: id_publicacion }, objeto, function (err, alquiler) {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ alquiler });
    })

})


router.post("/registrar-entrega-locatario/:codigoEntregaPropietario", function (req, res) {
    var codigoEntregaPropietario = req.params.codigoEntregaPropietario;
    var codigoPropietarioIngresado = true;

    MisAlquileres.findOneAndUpdate({ codigoEntregaPropietario: codigoEntregaPropietario }, { codigoPropietarioIngresado: codigoPropietarioIngresado }, function (err, alquiler) {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ alquiler });
    })
})

router.post("/registrar-entrega-propietario/:codigoEntregaLocatario", function (req, res) {
    var codigoEntregaLocatario = req.params.codigoEntregaLocatario;
    var codigoLocatarioIngresado = true;
    var fueDevuelto = false;
    var estado = 'Entregado y en alquiler';
    var date = new Date();
    var fechaEntrega = moment(date).format('DD/MM/YYYY');

    MisAlquileres.findOne({ codigoEntregaLocatario: codigoEntregaLocatario, fueDevuelto: fueDevuelto }, function (err1, alquiler1) {
        var diasAlquiler = alquiler1.cantidadDias;
        var date2 = new Date();
        date2.setDate(date2.getDate() + diasAlquiler + 1) //DEFINIR LA CANTIDAD DE DÍAS EN EL QUE SE PUEDE TARDAR EN devolder EL PRODUCTO
        var fechaCaducidadDevolucion = moment(date2).format('DD/MM/YYYY');

        MisAlquileres.findOneAndUpdate({ codigoEntregaLocatario: codigoEntregaLocatario }, {
            estado: estado, codigoLocatarioIngresado: codigoLocatarioIngresado,
            fechaEntrega: fechaEntrega, fechaCaducidadDevolucion: fechaCaducidadDevolucion
        }, function (err, alquiler) {
            if (err) return res.status(500).send({ message: 'Error' });

            if (!res) return res.status(404).send({ message: 'El doc no existe' });

            return res.status(200).send({ alquiler });
        })
    })
})
router.post("/registrar-demora-devolucion/:id_usuarioPropietario", function (req, res) {
    var fechaActual = moment(new Date()).format('DD/MM/YYYY');;
    var id_usuarioPropietario = req.params.id_usuarioPropietario;

    MisAlquileres.findOne({ id_usuarioPropietario: id_usuarioPropietario }, function (err1, alquiler1) {
        var fechaCaducidadDevolucion = alquiler1.fechaCaducidadDevolucion;
        if (fechaCaducidadDevolucion == fechaActual) {
            var estado = 'En proceso de devolucion'

            MisAlquileres.findByIdAndUpdate(alquiler1._id, { estado: estado }, function (err, alquiler) {
                if (err) return res.status(500).send({ message: 'Error' });

                if (!res) return res.status(404).send({ message: 'El doc no existe' });

                return res.status(200).send({ alquiler });
            })
        } else {
            res.status(500).send("xd")
        }
    })

})

/* Este evento lo genera el propietario cuando coloca el botón "Finalizar alquiler" en "Mis Alquileres" */
router.post('/registrar-proceso-finalizacion/:id_usuarioPropietario', function (req, res) {
    var id_usuarioPropietario = req.params.id_usuarioPropietario;
    var fueDevuelto = true;
    var codigoDevolucionPropietario = randomstring.generate(10);
    var codigoDevolucionLocatario = randomstring.generate(10);
    var codigoPropietarioDevolucionIngresado = false;
    var codigoLocatarioDevolucionIngresado = false;

    var objeto = {
        fueDevuelto: fueDevuelto,
        codigoDevolucionPropietario: codigoDevolucionPropietario, codigoDevolucionLocatario: codigoDevolucionLocatario,
        codigoPropietarioDevolucionIngresado: codigoPropietarioDevolucionIngresado,
        codigoLocatarioDevolucionIngresado: codigoLocatarioDevolucionIngresado
    }

    MisAlquileres.findOneAndUpdate({ id_usuarioPropietario: id_usuarioPropietario }, objeto, function (err, alquiler) {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ alquiler });
    })

})


router.post("/registrar-finalizacion-locatario/:codigoDevolucionPropietario", function (req, res) {
    var codigoDevolucionPropietario = req.params.codigoDevolucionPropietario;
    var codigoPropietarioDevolucionIngresado = true;

    MisAlquileres.findOneAndUpdate({ codigoDevolucionPropietario: codigoDevolucionPropietario }, { codigoPropietarioDevolucionIngresado: codigoPropietarioDevolucionIngresado }, function (err, alquiler) {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ alquiler });
    })
})

router.post("/registrar-finalizacion-propietario/:codigoDevolucionLocatario", function (req, res) {
    var codigoDevolucionLocatario = req.params.codigoDevolucionLocatario;
    var codigoLocatarioDevolucionIngresado = true;
    var estado = 'Finalizado';
    var date = new Date();
    var fechaDevolucion = moment(date).format('DD/MM/YYYY');

    MisAlquileres.findOneAndUpdate({ codigoDevolucionLocatario: codigoDevolucionLocatario }, {
        estado: estado, codigoLocatarioDevolucionIngresado: codigoLocatarioDevolucionIngresado, fechaDevolucion: fechaDevolucion
    }, function (err, alquiler) {
        if (err) return res.status(500).send({ message: 'Error' });

        if (!res) return res.status(404).send({ message: 'El doc no existe' });

        return res.status(200).send({ alquiler });
    })
})


module.exports = router;