const { API_GATEWAY_ADRESS } = require('../config/api_endpoints')
const axios = require('axios');

//Outro jeito de expor um get sem chamada pra outro microserviço.
//obs: o outro jeito esta descrito no HOME
const getconsultUser = (req, res) => {   
    res.render("usuarios/consultUser");
}

const postconsultUser = async (req, res) => {
    try {
       
        const usuarios = await axios.post( API_GATEWAY_ADRESS + '/usuarios/consultUser', req.body)
        //console.log(usuarios.data)
        if(usuarios.data.status == 1){
            req.flash("error_msg", usuarios.data.erro)
            res.redirect('/usuarios/consultUser');
        }else{
            if(usuarios.data.length == 0){
                console.log("Nenhum usuário encontrado")
                req.flash("error_msg", "Nenhum usuário encontrado")
                res.redirect('/usuarios/consultUser')
            }else{
                res.render('usuarios/consultUser', {usuarios : usuarios.data,  userLengh: usuarios.data.length })
            }
        }
    } catch (err) {
        res.status(500).send("API OUT OF WORK");
        console.error(err)
    }

}

const postRegistUser = async(req, res) =>{

    try {
        console.log(API_GATEWAY_ADRESS + '/usuarios/registro')
        const erros = await axios.post( API_GATEWAY_ADRESS + '/usuarios/registro', req.body)
        
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
        console.log(API_GATEWAY_ADRESS + '/usuarios/exc')
        
        //req.body = req.params.id
        const retorno = await axios.get(API_GATEWAY_ADRESS + '/usuarios/exc/'+req.params.id);
        
        if(retorno.data.status == 1){ // Status == 1 means error
            console.log("Passou")
            res.render('usuarios/consultUser', {erros: retorno.data.msg_return})


            /*
            req.flash("error_msg", retorno.data.msg_return)
            res.redirect('/usuarios/consultUser');
            */
           
        }else{
            req.flash("success_msg", retorno.data.msg_return)
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
