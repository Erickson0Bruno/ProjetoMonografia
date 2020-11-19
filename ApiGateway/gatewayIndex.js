//loading modules
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');
const handlebars =  require('express-handlebars')


const userServiceProxy = httpProxy('http://localhost:3000');
const loginServiceProxy = httpProxy('http://localhost:8085');


// Proxy request
/*
app.get('/users', (req, res, next) => {
  userServiceProxy(req, res, next);
})
*/
//HadleBars 
app.engine('handlebars', handlebars({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');
app.set('views', 'views');
//Routes
    //Login
    app.get('/', (req, res, next) => {
        loginServiceProxy(req, res, next);
    })
    app.post('/', (req, res, next) =>{
        loginServiceProxy(req, res, next);
    })

    //User  Control
    app.get('/usuarios*', (req, res, next) => {
        userServiceProxy(req, res, next);
    })
    app.post('/usuarios*', (req, res, next) =>{
       // console.log(req)
       console.log("Aqui")
        
        userServiceProxy(req, res, next);
    })



app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//Others
const PORT = '8086'
app.listen(PORT, function(){
    console.log("Conection Test of API Gateway on Port: "+ PORT )
})
