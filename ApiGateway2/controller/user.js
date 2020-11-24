const { USERAUTH_ENDPOINT } = require('../config/api_endpoints')
const axios = require('axios');


const postconsultUser = async (req, res) => {
    try {
        //console.log("User.js antes de chamar o metodo post")
        //console.log(USERAUTH_ENDPOINT + '/consultUser')

        const usuarios = await axios.post( USERAUTH_ENDPOINT + '/consultUser', req.body)
        res.send(usuarios.data)
        
    } catch (err) {
        //é pra tratar o erro aqui, por enquanto estou apenas mandando uma mensagem
        res.status(500).send("API OUT OF WORK");
        console.error(err)
    }

}

const getconsultUserWithID= async (req, res) => {
    try {
       // console.log(USERAUTH_ENDPOINT + '/consultUser/'+req.params.id)

        const erros = await axios.get( USERAUTH_ENDPOINT + '/consultUser/'+req.params.id)
        console.log(erros.data)
        res.send(erros.data)
        
    } catch (err) {
        res.status(500).send("API OUT OF WORK");
        //console.error(err)
        
    }

}

const postRegistUser = async(req, res) =>{

    try {
        console.log(USERAUTH_ENDPOINT + '/registro')
        const erros = await axios.post( USERAUTH_ENDPOINT + '/registro', req.body)
        
        res.send(erros.data)
        
    } catch (err) {
        res.status(500).send("API OUT OF WORK");
        console.error(err)
        
    }


}

const  getDeleteUser = async(req, res) =>{

    try {
        console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        console.log(USERAUTH_ENDPOINT + '/exc/'+req.params.id)
        const erros = await axios.delete( USERAUTH_ENDPOINT + '/exc/'+req.params.id)
        
        console.log(erros.data)
        res.send(erros.data)
        
    } catch (err) {
        res.status(500).send("API OUT OF WORK");
        //console.error(err)
        
    }


}



const putEditUser = async(req, res) =>{ 
    try {
        console.log(req.body)
        console.log(USERAUTH_ENDPOINT + '/edit')
        const erros = await axios.put( USERAUTH_ENDPOINT + '/edit', req.body)
        
        console.log(erros.data)
        res.send(erros.data)
        
    } catch (err) {
        console.error(err)
        res.status(500).send("API OUT OF WORK");
        
        
    }



}


module.exports = {
    postconsultUser,
    postRegistUser,
    getDeleteUser,
    getconsultUserWithID,
    putEditUser
}
