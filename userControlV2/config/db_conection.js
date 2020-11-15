const mongoose = require("mongoose")
 mongoose.Promise = global.Promise
 //mongoose.connect("mongodb://db:27017/sistemaLogin").then(() =>{
//mongoose.connect("mongodb://172.20.0.2:27017/sistemaLogin").then(() =>{
mongoose.connect("mongodb://localhost:27017/sistemaLogin").then(() =>{

     console.log("Conectado ao Banco!")
 }).catch((err) => {
     console.log("Erro ao se Conectar: "+ err)
 })

 module.exports ={
    mongoose: mongoose

}