const express = require('express');
const mongoose  = require('mongoose');
const router = express.Router();
const passport = require("passport")
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require('bcryptjs')
const bodyParser = require("body-parser");
const { send } = require('process');
const {AuthenticatedUser} = require('../helpers/verificaAdmin')
const SECRET = "164fee6cc59730e452b0eca679499a1e"//require('../config/authorization')


require('../models/Retorno')
const Retorno = mongoose.model('retorno')

const jwt = require('jsonwebtoken')

router.post('/login', (req, res, next) =>{
    var retorno = new Retorno()
    

    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        retorno.return_msg = err
        res.status(500).send(toJson(retorno))
        //res.json(err);
      }

      if (!user) {
        retorno.return_msg = info
        res.status(200).send(toJson(retorno));
        //res.json(info);
      }else{

        req.logIn(user, function(err) {
          if (err) {
            retorno.return_msg = err
            res.status(200).send(toJson(retorno))
            
            //res.json(err);
          }

          const token = jwt.sign({id: user.id}, SECRET, {
              expiresIn : 86400,
          })
          retorno.status = "0"
          retorno.returnData.push({user: user, token: token})
          //retorno.returnData.push({token})
          console.log(retorno.returnData)
          retorno.return_msg = 'Usuario encontrado!'
          res.status(200).send(toJson(retorno));
          //res.json({user, token});
        });
      }
  
    })(req, res, next);

})

function toJson(retorno){
  let json = JSON.stringify(retorno)
  return json

}

module.exports = router