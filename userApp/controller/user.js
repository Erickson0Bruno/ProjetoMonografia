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
        
        if(erros.data.status == 1){
            req.flash("error_msg", erros.data.erro)
            res.redirect('/usuarios/registro');

            //res.render('usuarios/registro', {error : erros.data.erro })   
        }else{
            req.flash("success_msg", "DEU CERTO")
            res.redirect('/usuarios/registro');
        }
        
        
    } catch (err) {
        res.send(err)
        
    }


}


const getDeleteUser = async(req, res) =>{ //("/exc/:id", (req, res) => {

    try {
        console.log(USERAUTH_ENDPOINT + '/usuarios/exc')
        
        //req.body = req.params.id
        const erros = await axios.get(USERAUTH_ENDPOINT + '/usuarios/exc/'+req.params.id);
        
        if(erros.data.status == 1){
            console.log("Passou")
            req.flash("error_msg", erros.data.erro)
            res.redirect('/usuarios/consultUser');
           
        }else{
            req.flash("success_msg", erros.data.erro)
            res.redirect('/usuarios/consultUser');
        }
        
        
    } catch (err) {
        res.status(500).send("API OUT OF WORK");
        //res.send(err)
        
    }
   
}

module.exports = {
    getconsultUser,
    postconsultUser,
    postRegistUser,
    getDeleteUser
}
