const { APIEXTERNA } = require('../config/api_endpoints')
const axios = require('axios');

const mongoose = require('mongoose')

require('../models/Retorno')
const Retorno = mongoose.model('retorno')


const postLikeQuestion = async(req, res) =>{
    var idquestion = req.params.id_question
    
    try {
        console.log(API_GATEWAY_ADRESS + '/learningstyle/like/'+id_owner+'/' +id_question)
        const retorno = await axios.post( API_GATEWAY_ADRESS + '/usuarios/registro', req.body)
        
        if(retorno.data.status == 1){
            req.flash("error_msg", retorno.data.return_msg)
            res.redirect('/usuarios/registro');

        }else{
            req.flash("success_msg", retorno.data.return_msg)
            res.redirect('/usuarios/registro');
        } 
    } catch (err) {
        res.send(err)
        
    }
}


const postDislikeQuestion = (req, res) =>{
    var idquestion = req.params.id_question

}

const getAnswersQuestions = async(req, res) =>{
    //var idquestion = req.params.id_question
    var retorno = new Retorno();
    try {


        //console.log(APIEXTERNA + '/users/email/'+req.params.email)
        //const retorno1 = await axios.get( APIEXTERNA + '/users/email/'+req.params.email)
        var idExterno = 190//retorno1.data.id
        console.log("retorno: "+ idExterno)

        console.log(APIEXTERNA + '/answers/'+idExterno)
        const retorno2 = await axios.get( APIEXTERNA + '/answers/'+idExterno)
        
        retorno.status = '0'
        retorno.return_msg = 'Consulta realizada com sucesso'
        retorno.returnData = retorno2.data

        res.send(toJson(retorno))
    } catch (err) {
        console.log(err)
        /**
        if(err.response.status == 404 && err.response.data != undefined){
            retorno.status = '1'
            retorno.return_msg = err.response.data

            res.status(200).send(toJson(retorno))
        }
         */
        res.send(err)
        //console.log("Status:"+err.response.status+ " Data: "+ JSON.stringify(err.response.data))
        
        //res.send(err.response)
        
    }
}



const getAllQuestions = async(req, res) =>{
    var retorno = new Retorno();
    try{
        console.log(APIEXTERNA + '/questions/')
        const resp = await axios.get( APIEXTERNA + '/questions/')
        
        retorno.status = '0'
        retorno.return_msg = 'Consulta realizada com sucesso'
        retorno.returnData = resp.data

        console.log(toJson(retorno.returnData))
        res.send(toJson(retorno))

    }catch(err){
        res.send(err)

    }
}

function toJson(retorno){
    let json = JSON.stringify(retorno)
    return json

}

module.exports = {
    getAllQuestions,
    getAnswersQuestions,
    postLikeQuestion,
    postDislikeQuestion
}