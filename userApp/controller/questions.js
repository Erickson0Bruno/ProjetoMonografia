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
                res.render("learningstyle/questions", {quetions: responseOne.data.returnData});
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
    try {
        console.log(API_GATEWAY_ADRESS + '/learningstyle/like/'+id_owner+'/' +id_question)
        const retorno = await axios.get( API_GATEWAY_ADRESS +'/learningstyle/like/'+id_owner+'/' +id_question)
        
        if(retorno.data.status == 1){
            //req.flash("error_msg", retorno.data.return_msg)
            
            //res.redirect('/usuarios/registro');

        }else{
            
            //res.redirect('/usuarios/registro');
        } 
    } catch (err) {
        res.send(err)
        
    }
}


const postDislikeQuestion = (req, res) =>{
    var idquestion = req.params.id_question

}




module.exports = {
    getQuestions,
    postQuestion,
    postLikeQuestion,
    postDislikeQuestion
}
