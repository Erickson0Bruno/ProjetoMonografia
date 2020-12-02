const { APIEXTERNA } = require('../config/api_endpoints')
const axios = require('axios');



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

module.exports = {
    postLikeQuestion,
    postDislikeQuestion
}