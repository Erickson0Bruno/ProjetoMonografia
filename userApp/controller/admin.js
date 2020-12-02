const { API_GATEWAY_ADRESS } = require('../config/api_endpoints')
const axios = require('axios');

const postLogin = async(req, res) =>{

    try {
        console.log(API_GATEWAY_ADRESS + '/auth/login')
        const retorno = await axios.post( API_GATEWAY_ADRESS + '/auth/login', req.body)
        
        if(retorno.data.status == 1){
           
            req.flash("error_msg", retorno.data.return_msg)
            res.redirect('/auth/login')   
        }else{
            req.session.token = retorno.data.returnData[0].token
            req.session.user = retorno.data.returnData[0].user
            req.flash("success_msg", "Usuário Logado")
            res.redirect('/');
            
        }  
    } catch (err) {
        req.flash("error_msg", err.response.status)
        res.redirect('/');
        
    }


}

module.exports = {
    postLogin
}
