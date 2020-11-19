const { USERAUTH_ENDPOINT } = require('../config/api_endpoints')
const axios = require('axios');

//Outro jeito de expor um get sem chamada pra outro microserviço.
//obs: o outro jeito esta descrito no HOME
const getconsultUser = (req, res) => {   
    res.render("usuarios/consultUser");
}

const postconsultUser = async (req, res) => {
    try {
       
        const usuarios = await axios.post( USERAUTH_ENDPOINT + '/usuarios/consultUser', req.body)
        //console.log(usuarios.data)
        res.render('usuarios/consultUser', {usuarios : usuarios.data })
    } catch (err) {
        res.status(500).send("API OUT OF WORK");
        console.error(err)
    }

}

const postRegistUser = async(req, res) =>{

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
    getconsultUser,
    postconsultUser,
    postRegistUser,
}
