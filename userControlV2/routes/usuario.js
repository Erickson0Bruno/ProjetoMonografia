const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
require('../models/Retorno')
const Retorno = mongoose.model('retorno')
const bcrypt = require('bcryptjs')

//Helpers
const {Admin} = require('../helpers/verificaAdmin')
const {AuthenticatedUser} = require('../helpers/verificaAdmin')
 

router.post('/registro', (req, res) => {
    var retorno = new Retorno();
    retorno.status = '1' // Código de erro
   
    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push("Nome inválido")
    }
    
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push("\tEmail inválido")
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push("\tSenha inválida")
    }

    if(!req.body.senha2 || typeof req.body.senha2 == undefined || req.body.senha2 == null){
        erros.push( "\tConfirmação de Senha inválido")
    }
    if(req.body.senha != req.body.senha2){
        erros.push("\tSenhas não coincidem ")
    }

    if(erros.length > 0){
        retorno.return_msg = erros 
        res.send(toJson(retorno)) 
    }else{
       
        Usuario.findOne({email: req.body.email}).then((usuario)  => {
            if(usuario){
                retorno.return_msg.push('Já existe uma conta com este email')
                res.send(toJson(retorno))
            }else{
                //Verifica se o usuario é Admin
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
                            retorno.return_msg.push("Houve um erro durante o salvamento do usuário")
                            res.send(toJson(retorno))
                        }

                        newUser.senha = hash


                        newUser.save().then(() =>{
                            retorno.status = '0'
                            retorno.return_msg = erros
                            retorno.return_msg.push("Usuário Salvo com Sucesso.")
                            res.send(toJson(retorno))

                        }).catch((erro) =>{
                            retorno.return_msg.push("Erro ao salvar usuário no Banco")
                            res.send(toJson(retorno))
                            
                        })
                    })

                })
            }
        }).catch((err) =>{
            
           retorno.return_msg.push("Erro ao salvar usuário no Banco")
           restorno.returnData = err
           res.status(500).toJson(retorno)
        })

    }

});


router.post('/consultUser', (req, res) => {
    var retorno = new Retorno()

    
    try{
        const query = Usuario.find({email: { $regex: '.*' + req.body.email + '.*' }, 
                    nome: { $regex: '.*' + req.body.nome + '.*' }
                    })
        const promisse = query.exec()

        promisse.then(usuarios => {
            
            if(usuarios.length == 0){
                retorno.return_msg.push('Nenhum usuario encontrado')
                res.send(toJson(retorno));
            }else{
                retorno.status = '0'
               retorno.return_msg.push('Encontrou')
                retorno.returnData = usuarios
                
                res.send(toJson(retorno));

            }
           
        }).catch(err => {
            retorno.status = '1'
            retorno.return_msg.json("Ocorreu algum erro")
            res.status(500).send(toJson(retorno));
        })
            
     
    }catch (err){
        res.status(500).json({ err, isError: true })
        
    }
    
});

router.get('/consultUser/:id', (req, res) => {
    var retorno = new Retorno()

    
    try{
        const query = Usuario.find({ "_id" : req.params.id})
        const promisse = query.exec()

        promisse.then(usuarios => {
            
            if(usuarios.length == 0){
                retorno.return_msg.push('Nenhum usuario encontrado')
                res.send(toJson(retorno));
            }else{
                retorno.status = '0'
                retorno.return_msg.push('Encontrou')
                retorno.returnData = usuarios
                res.send(toJson(retorno));
            }
           
        }).catch(err => {
            retorno.status = '1'
            retorno.return_msg.json("Ocorreu algum erro")
            res.status(500).send(toJson(retorno));
        })
            
     
    }catch (err){
        res.status(500).json({ err, isError: true })
        
    }
    
});

router.delete("/exc/:id", (req, res) => {
    var retorno = new Retorno()

    Usuario.deleteOne({ 
        "_id" : req.params.id
    }).then(() =>{
        retorno.status = '0'
        retorno.return_msg = 'Usuário Excluido com Sucesso'
        
        res.send(toJson(retorno))
    }).catch((err)=>{
      res.status(500).json(toJson(retorno));
  
    
    })
    
});

router.put("/edit/", (req, res) => {
    var retorno = new Retorno()
    

    Usuario.findOne({ "_id" : req.body.id}).then((usuario) => {
        usuario.nome = req.body.nome
        usuario.email = req.body.email

         
        usuario.save().then(() =>{
            retorno.status = '0'
            retorno.return_msg.push("Usuário Alterado com Sucesso.")
            res.send(toJson(retorno))

        }).catch((erro) =>{
            retorno.return_msg.push("Erro ao salvar usuário no Banco")
            res.send(toJson(retorno))
            
        })
    

        
        
    }).catch((err)=>{
        res.status(500).json(toJson(retorno));
  })
    
});

/*
router.put("/edit/", (req, res) => {
    var retorno = new Retorno()
    console.log(req.body)
    

    Usuario.findOne({ "_id" : req.body.id}).then((usuario) => {
        usuario.nome = req.body.nome
        usuario.email = req.body.email

        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(req.body.senha, salt, (erro, hash) => {
                if(erro){
                    retorno.return_msg.push("Houve um erro durante o salvamento do usuário")
                    res.send(toJson(retorno))
                }
                
                usuario.senha = hash

                
                usuario.save().then(() =>{
                    console.log('AAAAAAAAAAA')
                    retorno.status = '0'
                    retorno.return_msg.push("Usuário Alterado com Sucesso.")
                    res.send(toJson(retorno))

                }).catch((erro) =>{
                    console.log('BBBBBBBBBBB: '+ erro)

                    retorno.return_msg.push("Erro ao salvar usuário no Banco")
                    res.send(toJson(retorno))
                    
                })
            })

        })
        
    }).catch((err)=>{
        res.status(500).json(toJson(retorno));
  })
    
});
*/
function toJson(retorno){
    let json = JSON.stringify(retorno)
    return json

}

module.exports = router
