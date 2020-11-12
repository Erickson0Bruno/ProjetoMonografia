const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const strategy  = require("passport");

//Modelo de Usuario
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

 //Passport Midware
 
module.exports = function(passport){
   
    passport.use(new localStrategy({usernameField: 'email', passwordField: "password"}, (email, senha, done) =>{

        Usuario.findOne({email: email}).then((usuario) => {
            if(!usuario){
                
                return done(null, false, {message: "Esta conta não existe"})
            }

           /* bcrypt.compare( senha, usuario.senha, (erro, batem) =>{
                if(!batem){
                    console.log("Batem ")
                    return done(null, usuario)
                }else{
                    console.log("Não Batem ")
                    return done(null, false, {message:"Senha incorreta"})
                }
            })
            */
            // comparando as senhas
            bcrypt.compare(senha, usuario.senha, (err, isValid) => {
                
                if (err) { 
                    return done(err) 
                }if (!isValid) {
                    
                    return done(null, false, {message: "Senha incorreta"}) 
                }

                return done(null, usuario) 
            })

        })

    }))

    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) =>{
        Usuario.findById(id, (err, usuario) =>{
            done(err, usuario)
        })
    })




};