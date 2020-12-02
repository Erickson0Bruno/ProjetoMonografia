//loading modules
const express = require('express')
const handlebars =  require('express-handlebars')
const bodyParser = require("body-parser")
const app = express()
const path = require('path')
const session = require("express-session")
const mongoose = require("./config/db_conection")
const passport = require('passport')
require("./config/authorization")(passport)

//Declaracao de Rotas
const admin = require('./routes/admin')

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
    
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    
    
    //Midwares
    app.use((req, res, next) =>{
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Method', 'GET, POST, PUT, OPTIONS')
        
        //criando variaveis globais 
        next()

    })

//Routes
app.use('/', admin);

//Others
const PORT = '4000'
app.listen(PORT, function(){
    console.log("Conection Test of Login Microservice on Port: "+ PORT)
})


