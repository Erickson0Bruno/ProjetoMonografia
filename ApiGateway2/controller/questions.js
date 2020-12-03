const { APIEXTERNA } = require('../config/api_endpoints')
const axios = require('axios');

const mongoose = require('mongoose')

require('../models/Retorno')
const Retorno = mongoose.model('retorno')


const postLikeQuestion = async(req, res) =>{
    var idquestion = req.params.id_question
    var email = req.params.email
    var retorno = new Retorno();
    try {

        console.log(APIEXTERNA + '/users/email/'+email)
        const retorno1 = await axios.get( APIEXTERNA + '/users/email/'+email)
        var idExterno = retorno1.data.id //190 //erickson=290
        console.log("retorno: "+ idExterno)

        ///Path= answer/{owner_id}/{question_number} =>  Request{"value": true, "question_number": 0,
        //"owner_id": 0}
        console.log(API_GATEWAY_ADRESS + '/answer/'+idExterno+'/' +idquestion)
        const retorno2 = await axios.post( API_GATEWAY_ADRESS + '/answer/'+idExterno+'/' +idquestion, 
        {"value": true, "question_number": idquestion, "owner_id": idExterno})
        
        retorno.status = '0'
        retorno.return_msg = 'Resposta aceita'

        res.status(200).send(toJson(retorno));
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


        console.log(APIEXTERNA + '/users/email/'+req.params.email)
        const retorno1 = await axios.get( APIEXTERNA + '/users/email/'+req.params.email)
        var idExterno = retorno1.data.id //190
        console.log("retorno: "+ idExterno)

        console.log(APIEXTERNA + '/answers/'+idExterno)
        const retorno2 = await axios.get( APIEXTERNA + '/answers/'+idExterno)
        const anwsers = retorno2.data

                
        console.log(APIEXTERNA + '/questions/')
        const retorno3 = await axios.get( APIEXTERNA + '/questions/')
        const allQuestions = retorno3.data

        
        retorno.return_msg = 'Consulta realizada com sucesso'
        retorno.returnData = unansweredQuestions(allQuestions, anwsers)//retorno2.data
        if(retorno.returnData != undefined){//se o usuario tem perguntas a responder
            retorno.status = '0'
        }
        
        res.send(toJson(retorno))
    } catch (err) {
        //console.log(err)
        
        if(err.response.status == 404 && err.response.data != undefined){
            retorno.status = '0'
            retorno.return_msg = err.response.data

            console.log(APIEXTERNA + '/questions/'+ '  Dentro do Cath')
            const retorno3 = await axios.get( APIEXTERNA + '/questions/')
            retorno.returnData = retorno3.data


            res.status(200).send(toJson(retorno))
        }
         
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

        //console.log(toJson(retorno.returnData))
        res.send(toJson(retorno))

    }catch(err){
        res.send(err)

    }
}

function toJson(retorno){
    let json = JSON.stringify(retorno)
    return json

}

//retorna um JSON com as questoes {number, prompt, type}
function unansweredQuestions(allQuestions, anwsers){
    const unanswered = unansweredFunction(anwsers);
    const returnQuestions = []
    if(unanswered.length == 0){
        return 
    }else{
        for(i=0; i<unanswered.length; i++){
            for(j=0; j<allQuestions.length;j++){
                //console.log(allQuestions[j])
                if(unanswered[i] == allQuestions[j].number){
                    
                    returnQuestions.push(allQuestions[j])
                }
            }
        }
        //console.log("Questoes Ñ Respondidas: "+toJson(returnQuestions))
        return returnQuestions
        
    }
//console.log(anwsersquestions)
}

//Retorna um vetor com o numero das questoes nao respondidas
function unansweredFunction(anwsers){
    const allAnswers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,
        28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,
        57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80]
    let anwsersquestions = []
    
    for(i=0; i<allAnswers.length; i++){
        anwsersquestions.push(anwsers[i].question_number)
    }
     const b = [1, 2, 3, 4, 5, 13, 10, 8];

    const diff = [];
    allAnswers.map((item) => {
        if(anwsersquestions.indexOf(item) == -1) {
            diff.push(item);
        }
    });
    
    return diff.sort((allAnswers, anwsersquestions) => allAnswers - anwsersquestions);

    
}

module.exports = {
    getAllQuestions,
    getAnswersQuestions,
    postLikeQuestion,
    postDislikeQuestion
}