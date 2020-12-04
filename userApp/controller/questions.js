const { API_GATEWAY_ADRESS } = require('../config/api_endpoints')
const axios = require('axios');


const getQuestions = async(req , res) => {

    try {
    /*
        console.log(API_GATEWAY_ADRESS + '/answers/' +req.session.user.email)
        const retorno = await axios.get( API_GATEWAY_ADRESS +'/answers/' +req.session.user.email)
        
        if(retorno.status == 200){
            if(retorno.data.status == '0'){ //tem questões respondidas
                res.render("learningstyle/questions");
            }else{
                res.render("admin/home")
            }
        }
    //question_number":1,"value":true,"owner_id":190,"id":116}

    */
        let one = API_GATEWAY_ADRESS +'/answers/' +req.session.user.email;
        let two = API_GATEWAY_ADRESS +'/questions';

        const requestOne = axios.get(one);
        const requestTwo = axios.get(two);

        axios.all([requestOne]).then(axios.spread((...responses) => {
        const responseOne = responses[0]
       // const responseTwo = responses[1]
        //const responesThree = responses[2]
        //console.log("Retorno 2: "+responseTwo.data.returnData[0].prompt)
        if(responseOne.status == 200){
            if(responseOne.data.status == '0'){ //tem questões respondidas
                //console.log("Resposta: "+ JSON.stringify(responseOne.data.returnData))
                
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
    console.log('adfghjkhfydtvfcsvst')
    try {
        console.log("GET: "+API_GATEWAY_ADRESS +'/learningstyle/like/'+email+'/' +idquestion)
        const retorno = await axios.post(API_GATEWAY_ADRESS +'/learningstyle/like/'+email+'/' +idquestion, {})
        console.log("AQUI "+idquestion+" :Método PostLike userApp")
        
        if(retorno.data.status == '0'){
            console.log("Dentro do if: "+JSON.stringify(retorno.data))
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
