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
    //Session
    app.use(
        session({
          secret: 'keyboard cat',
          cookie: {
            expires: new Date(Date.now() + 30 * 86400 * 1000),
            maxAge: Date.now() + 30 * 86400 * 1000,
            secure: false
          },
          saveUninitialized: true,
          resave: true
        })
      )
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

    //Midwares mensagens em tela
    app.use((req, res, next) =>{
        //criando variaveis globais 
        res.locals.success_msg = req.flash("success_msg")  
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
        next()

    })
   
//importa as rotas
router(app)


//Others
const PORT = '8000'
app.listen(PORT, function(){
    console.log("Teste de Conexão porta "+ PORT)
})
