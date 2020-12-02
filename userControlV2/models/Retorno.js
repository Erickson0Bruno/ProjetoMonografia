const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Retorno = new Schema({
    status: {
        type : String,
        default : 1
    },
    return_msg:{
        type : []
    },
    
    returnData: {
        
        type : []
        
    }


})

mongoose.model("retorno", Retorno)
/*
const novoUsuario = mongoose.model('usuarios')
new novoUsuario({
    nome: "Erickson Bruno",
    email: "erickson.bruno.costa@gmail.com",
    eAdmin: 1,
    senha: "123515184848818181818181818188184689489"


}).save().then(() =>{
    console.log("Salvo Com Sucesso")
}
).catch() */