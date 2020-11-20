const { USERAUTH_ENDPOINT } = require('../config/api_endpoints')
const axios = require('axios');

const getDeleteUser = async(req, res) =>{

    try {
        console.log(USERAUTH_ENDPOINT + '/usuarios/registro')
        const erros = await axios.post( USERAUTH_ENDPOINT + '/usuarios/registro', req.body)
        
        if(erros.data.status = 1){
            res.render('usuarios/registro', {error : erros.data.erro })   
        }else{
            req.flash("success_msg", "DEU CERTO")
            res.redirect('/usuarios/registro');
        }
        
        
    } catch (err) {
        res.send(err)
        
    }


}

module.exports = {
    getDeleteUser
}
