//const cors = require('cors');
//const authRoutes = require('../auth/auth.routes');
const express = require('express');
const router = express.Router()
const User = require('../auth/auth.model');
const nodemailer = require("nodemailer");
const app = express();

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const db = "mongodb+srv://fede:1use@cluster0-pdt0d.mongodb.net/test?retryWrites=true&w=majority"



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

            if (!user || !user.confirmed) {

                res.status(401).send('Invalid email')
            } else {

                if (user.password !== userData.password) {

                    res.status(401).send('Invalid Password')
                }
                else {


                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token })
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

//app.use(router);

module.exports = router;