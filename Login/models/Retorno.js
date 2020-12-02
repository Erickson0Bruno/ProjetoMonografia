const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Retorno = new Schema({
    status: {
        type : String,
        default : 1 //Falha
    },
    return_msg:{
        type : []
    },
    returnData: {
        
        type : []
        
    }


})

mongoose.model("retorno", Retorno)
