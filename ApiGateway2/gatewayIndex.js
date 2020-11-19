//loading modules
const express = require('express')
const handlebars =  require('express-handlebars')
const bodyParser = require("body-parser")
const app = express()
const path = require('path')
const session = require("express-session")
const flash = require("connect-flash")
const axios = require('axios')

//Declaracao de Rotas
const router = require('./routes/routes')

//Configurations 
    
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

    //Midwares mensagens em tela
    //Midwares
    app.use((req, res, next) =>{
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Method', 'GET, POST, PUT, OPTIONS')
        //criando variaveis globais 
        res.locals.user = req.user || null
        next()

    })
   
//importa as rotas
router(app)


//Others
const PORT = '8086'
app.listen(PORT, function(){
    console.log("Teste de Conexão porta "+ PORT)
})
