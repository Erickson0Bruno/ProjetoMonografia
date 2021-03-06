const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')

//Helpers
const {Admin} = require('../helpers/verificaAdmin')
const {AuthenticatedUser} = require('../helpers/verificaAdmin')
 
router.get('/registro',  (req, res) => {
    res.render('usuarios/registro');
});


router.post('/registro', (req, res) => {
    var erros = []
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }
    
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"})
    }

    if(!req.body.senha2 || typeof req.body.senha2 == undefined || req.body.senha2 == null){
        erros.push({texto: "Confirmação de Senha inválido"})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: "Senhas não coincidem "})
    }

    if(erros.length > 0){
        res.render('usuarios/registro', {erros: erros});
    }else{
       
        Usuario.findOne({email: req.body.email}).then((usuario)  => {
            if(usuario){
                console.log("Já existe uma conta com este email")
                req.flash("error_msg", "Já existe uma conta com este email")
                res.redirect('/usuarios/registro');
            }else{
                var eAdmin 
                if(req.body.eAdmin){
                    eAdmin = '1'
                }else{
                    eAdmin = '0'
                }
                const newUser = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha:  req.body.senha,
                    eAdmin: eAdmin
                })

                bcrypt.genSalt(10, (err, salt) =>{
                    bcrypt.hash(newUser.senha, salt, (erro, hash) => {
                        if(erro){
                            console.log("Houve um erro durante o salvamento do usuário")
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuário")
                            res.redirect('/');
                        }

                        newUser.senha = hash

                        console.log(hash)

                        newUser.save().then(() =>{
                            console.log("Usuário salvo com sucesso")
                            req.flash("success_msg", "Usuário salvo com sucesso")
                            res.redirect('/');
                        }).catch((erro) =>{
                            console.log("Erro ao salvar usuário")
                            console.log(erro)
                            req.flash("error_msg", "Erro ao salvar usuário")
                            res.redirect('/usuarios/registro');

                        })
                    })

                })





            }
        }).catch((err) =>{
            
            req.flash("error_msg", "Houve um erro interno")
            res.redirect('/')

        })

    }

});

router.get('/', (req, res) => {
    res.render("admin/home");

});

router.get('/consultUser', (req, res) => {
   
    res.render('admin/consultUser');
  //  res.render('admin/consultUser.handlebars');
});
router.post('/consultUser', (req, res) => {
    //console.log(req.body.email)
    Usuario.find().where("email").equals(req.body.email).where("nome").equals("Erickson Bruno Pereira Costa")
        
    
    .then(users => {
        // create context Object with 'usersDocuments' key
        const context = {
          usersDocuments: users.map(document => {
            return {
              email: document.email,
              _id: document._id,
            }
          })
        }
        //console.log(context.usersDocuments)
        // rendering usersDocuments from context Object
        
        res.render('admin/consultUser', {
            usuarios: context.usersDocuments
        })
      }).catch((err)=>{
        console.log("ERRO")
        req.flash("error_msg", "Nenhum Registro Encontrado!")
        res.redirect('/usuarios/consultUser')
    })
    
});

router.get('/editUser', (req, res) => {
    res.render('admin/')
});


router.get("/exc/:id", (req, res) => {
    Usuario.remove({ 
        "_id" : req.params.id
    }).then(() =>{
        req.flash("success_msg", "Usuário Excluido com Sucesso!")
         res.redirect('../consultUser')
    }).catch((err)=>{
        console.log(err)
    
    })
    
});


module.exports = router
