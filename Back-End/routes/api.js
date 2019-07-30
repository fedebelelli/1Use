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
            console.log(error)
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
                        subject: 'Estas a punto de ser usuario de OneUse!!!',
                        html: 'Para confirmar tu email, por favor, haga click en este link. Gracias por registrarte en OneUse: <a href="' + url + '">' + url + '</a>',
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

router.put('/update-user', function (req, res) {

    var params = req.query.email;
    var user = req.body;

    User.findOneAndUpdate({ email: params }, user, (err, pUpdated) => {
        if (err) return res.status(500).send("Error en BD");
        if (!pUpdated) return res.status(500).send("Error en BD");
        return res.status(200).send("Datos guardados correctamente");
    });
})


module.exports = router;