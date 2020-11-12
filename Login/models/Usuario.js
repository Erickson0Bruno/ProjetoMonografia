const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Usuario = new Schema({
    nome: {
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    eAdmin: {
        type : Number,
        default : 0
    },
    senha: {
        type : String,
        required : true
    }


})

mongoose.model("usuarios", Usuario)
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