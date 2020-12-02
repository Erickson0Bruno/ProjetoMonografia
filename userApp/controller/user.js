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
        if(usuarios.data.status == 1){
            req.flash("error_msg", usuarios.data.return_msg)
            res.redirect('/usuarios/consultUser');
        }else{
            
            res.render('usuarios/consultUser', {usuarios : usuarios.data.returnData,  userLengh: usuarios.data.returnData.length })
            
        }
    } catch (err) {
        console.log(res.response.status)
        res.status(500).send("API OUT OF WORK");
        //console.error(err)
    }

}

const postRegistUser = async(req, res) =>{

    try {
        console.log(API_GATEWAY_ADRESS + '/usuarios/registro')
        const retorno = await axios.post( API_GATEWAY_ADRESS + '/usuarios/registro', req.body)
        
        if(retorno.data.status == 1){
            req.flash("error_msg", retorno.data.return_msg)
            res.redirect('/usuarios/registro');

        }else{
            req.flash("success_msg", retorno.data.return_msg)
            res.redirect('/usuarios/registro');
        } 
    } catch (err) {
        res.send(err)
        
    }


}


const getDeleteUser = async(req, res) =>{ //("/exc/:id", (req, res) => {

    try {
        console.log(API_GATEWAY_ADRESS + '/usuarios/exc/'+req.params.id)
        
        const retorno = await axios.delete(API_GATEWAY_ADRESS + '/usuarios/exc/'+req.params.id);

        if(retorno.data.status == 1){
            
            req.flash("error_msg", retorno.data.return_msg)
            res.redirect('/usuarios/consultUser');

        }else{
            //console.log(retorno.data.status)
            //console.log(retorno.data)
            req.flash("success_msg", retorno.data.return_msg)
            res.redirect('/usuarios/consultUser');
        } 
        
    } catch (err) {
        console.log(err)
        res.status(500).send("API OUT OF WORK");
        //res.send(err)
        
    }
   
}


const getEditUser = async(req, res) =>{ 
    try {
        console.log(API_GATEWAY_ADRESS + '/usuarios/consultUser/'+req.params.id)
        const usuarios = await axios.get( API_GATEWAY_ADRESS + '/usuarios/consultUser/' +req.params.id)
        //console.log(usuarios.data)
        if(usuarios.data.status == 1){
            //console.log(usuarios.data.return_msg)
            req.flash("error_msg", usuarios.data.return_msg)
            res.redirect('/usuarios/consultUser');
        }else{
            //console.log({usuarios : usuarios.data.returnData[0]})
            res.render('usuarios/alterarUser.handlebars', {usuarios : usuarios.data.returnData[0]})
            
        }
    } catch (err) {
        res.status(500).send("API OUT OF WORK");
        console.error(err)
    }



}

const postEditUser = async(req, res) =>{ 
    try {
        console.log(req.body)
        console.log(API_GATEWAY_ADRESS + '/usuarios/edit/'+req.body.id)
        const retorno = await axios.put( API_GATEWAY_ADRESS + '/usuarios/edit', req.body)
        //console.log(usuarios.data)
      
        if(retorno.data.status == 1){
            console.log(retorno.data.return_msg)
            req.flash("error_msg", retorno.data.return_msg)
            res.redirect('/usuarios/consultUser');
        }else{
            req.flash("success_msg", retorno.data.return_msg)
            res.redirect('/usuarios/consultUser');
        }
        
    } catch (err) {
        console.error(err)
        res.status(500).send("API OUT OF WORK");
        
    }



}

module.exports = {
    getconsultUser,
    postconsultUser,
    postRegistUser,
    getDeleteUser,
    getEditUser, 
    postEditUser
}
