const { API_GATEWAY_ADRESS } = require('../config/api_endpoints')
const axios = require('axios');


const getQuestions = async(req , res) => {

    try {
   
        let one = API_GATEWAY_ADRESS +'/answers/' +req.session.user.email;
        let two = API_GATEWAY_ADRESS +'/questions';

        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);

        axios.all([requestOne]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
         if(responseOne.status == 200){
            if(responseOne.data.status == '0'){ //tem questões respondidas
                
                res.render("learningstyle/questions", {questions: responseOne.data.returnData, email: req.session.user.email});
            }else{
                res.render("admin/home")
            }
        }
        // use/access the results 
        })).catch(errors => {
        // react on errors.
        })
    } catch (err) {
        console.log(err)
        res.send(err)
    }   
}


const postQuestion = (req, res) =>{
    var idquestion = req.params.id_question

    console.log("ELEMENTO: "+idquestion)
  
}

const postLikeQuestion = async(req, res, next) =>{
    
    var idquestion = req.params.id_question
    var email = req.session.user.email
    try {
        console.log("GET: "+API_GATEWAY_ADRESS +'/learningstyle/like/'+email+'/' +idquestion)
        const retorno = await axios.post(API_GATEWAY_ADRESS +'/learningstyle/like/'+email+'/' +idquestion, {})
        
        if(retorno.data.status == '0'){
            res.status(200).send(retorno.data.return_msg);
            
        } 
    } catch (err) {
        res.send(err)
       
   }
}


const postDislikeQuestion = async(req, res) =>{
    
    var idquestion = req.params.id_question
    var email = req.session.user.email
    
    try {
        console.log("POST: "+API_GATEWAY_ADRESS +'/learningstyle/dislike/'+email+'/' +idquestion)
        const retorno = await axios.post(API_GATEWAY_ADRESS +'/learningstyle/dislike/'+email+'/' +idquestion, {})
        
        if(retorno.data.status == '0'){
            res.status(200).send(retorno.data.return_msg);
            
        } 
    } catch (err) {
        res.send(err)
       
   }
}


const postAnwserQuestion = async(req, res) =>{
    
    var idquestion = req.params.id_question
    var email = req.session.user.email
    
    try {
        console.log("POST: "+API_GATEWAY_ADRESS +'/learningstyle/anwser/'+email+'/' +idquestion)
        const retorno = await axios.post(API_GATEWAY_ADRESS +'/learningstyle/anwser/'+email+'/' +idquestion, req.body)
        
        if(retorno.data.status == '0'){
            res.status(200).send(retorno.data.return_msg);
            
        } 
    } catch (err) {
        res.send(err)
       
   }
}



module.exports = {
    postAnwserQuestion,
    getQuestions,
    postQuestion,
    postLikeQuestion,
    postDislikeQuestion
}
