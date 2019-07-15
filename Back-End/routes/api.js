//const cors = require('cors');
//const authRoutes = require('../auth/auth.routes');
const express = require('express');
const router = express.Router()
const User = require('../auth/auth.model');
const app = express();
  
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const db = "mongodb+srv://fede:1use@cluster0-pdt0d.mongodb.net/test?retryWrites=true&w=majority"



mongoose.connect(db, {useNewUrlParser: true},err => {

    if(err){

        console.error('No se pudo conectar a la bd' +err)
    }
    else{

        console.log('Conectado a la bd en la nube')
    }
})





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

 router.post('/register', (req, res)=> {

     let userData = req.body
     let user = new User(userData)
     user.save((error, registeredUser) => {

        if(error){

             console.log(error)
         } else{

             let payload = {subject: registeredUser._id}
             let token = jwt.sign(payload, 'secretKey')  
             res.status(200).send({token})
         }

     })

     })

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) =>{

       if(error){

            console.log(error)
        }
        else {

                if(!user){

                        res.status(401).send('Invalid email')
                } else{

               if(user.password !== userData.password){

                     res.status(401).send('Invalid Password')
                }
                else{

                  //  res.status(200).send(user)
                     let payload = {subject: user._id}
                     let token = jwt.sign(payload,'secretKey')
                     res.status(200).send({token})
                 }
            
            }
          


    }
    
})


 })



 //app.use(router);

module.exports = router;