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
    app.use(session({
        secret: "teste",
        resave: false,
//        ttl: 1*5, //60 segundos de seção -- apenas para teste
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    //HadleBars 
    app.engine('handlebars', handlebars({defaultLayout : 'main'}));
    app.set('view engine', 'handlebars');
    app.set('views', 'views');
    
   //Conecção com o banco foi exportado pra o arquivo config/db_conection.js

    //Public -- pasta do bootstrap
    app.use(express.static(path.join(__dirname, "public")));

    //Midwares
    app.use((req, res, next) =>{
        //criando variaveis globais 
        res.locals.success_msg = req.flash("success_msg")  
        res.locals.error_msg = req.flash(" ")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
        next()

    })
   
//Routes
app.use('/', usuarios);



//Others
const PORT = '8080'
app.listen(PORT, function(){
    console.log("Conection Test of User Control Microservice on Port: "+ PORT )
})
