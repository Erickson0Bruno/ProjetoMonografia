//loading modules
const express = require('express')
const handlebars =  require('express-handlebars')
const bodyParser = require("body-parser")
const app = express()
const path = require('path')
const session = require("express-session")
const flash = require("connect-flash")
const mongoose = require("./config/db_conection")
const passport = require('passport')

//Declaracao de Rotas
const usuarios = require("./routes/usuario")
//Configurations 
    //Session
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
      
   //Conecção com o banco foi exportado pra o arquivo config/db_conection.js
   //HadleBars 
   app.engine('handlebars', handlebars({defaultLayout : 'main'}));
   app.set('view engine', 'handlebars');
   app.set('views', 'views');
    //Midwares
    app.use((req, res, next) =>{
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Method', 'GET, POST, PUT, OPTIONS')
        //criando variaveis globais 
        res.locals.user = req.user || null
        next()

    })
   
//Routes
app.use('/', usuarios);

//Others
const PORT = '3000'
app.listen(PORT, function(){
    console.log("Conection Test of User Control Microservice on Port: "+ PORT )
})
