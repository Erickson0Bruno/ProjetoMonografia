const { USERAUTH_ENDPOINT } = require('../config/api_endpoints')
const axios = require('axios');

//Outro jeito de expor um get sem chamada pra outro microserviço.
//obs: o outro jeito esta descrito no HOME
const getconsultUser = (req, res) => {   
    res.render("usuarios/consultUser");
}

const postconsultUser = async (req, res) => {
    try {
       
        const usuarios = await axios.post( USERAUTH_ENDPOINT + '/consultUser', req.body)
        //console.log(usuarios.data)
        res.render('usuarios/consultUser', {usuarios : usuarios.data })
    } catch (err) {
        res.send(err)
        console.error(err)
    }

}

const postRegistUser = async(req, res) =>{

    try {
        console.log(USERAUTH_ENDPOINT + '/registro')
        const erros = await axios.post( USERAUTH_ENDPOINT + '/registro', req.body)
        //console.log(erros)
        
        console.log('tem erro')
        res.render('usuarios/registro', {erros: erros.data});
        
        //res.render('usuarios/consultUser', {usuarios : usuarios.data })
        

        
    } catch (err) {
        res.send(err)
        //console.error(err)
    }


}

module.exports = {
    getconsultUser,
    postconsultUser,
    postRegistUser,
}
