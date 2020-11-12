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

router.get('/', (req, res) => {
    if(req.query.fail)
    res.render('admin/admin.handlebars', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('admin/admin.handlebars', { message: null });
    
});
/*
router.get('/login', (req, res) => {
    res.render("admin/admin.handlebars");
});*/
router.get('/login', function(req, res){
  if(req.query.fail)
    res.render('admin/admin.handlebars', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('admin/admin.handlebars', { message: null });
})


router.post("/", (req, res, next) =>{
    //res.send("Email: " + req.body.email);
//console.log("Passou pelo metodo POST")  

    passport.authenticate("local", {
        successRedirect : "/",
        failureRedirect : "/",
        failureFlash : true
        
    })(req,res, next)



})

router.get('/logout', (req, res) => {
    req.logout()
    req.flash("success_msg" ,"Deslogado com sucesso")
    res.redirect('/');
});



module.exports = router