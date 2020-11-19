const { USERAUTH_ENDPOINT } = require('../config/api_endpoints')
const axios = require('axios');


const postconsultUser = async (req, res) => {
    try {
        console.log("User.js antes de chamar o metodo post")
        console.log(USERAUTH_ENDPOINT + '/consultUser')

        const usuarios = await axios.post( USERAUTH_ENDPOINT + '/consultUser', req.body)
        //console.log(usuarios.data)

        //if(erros.data.status = 1){
            console.log(usuarios.data)
            res.send(usuarios.data)
            //res.render('usuarios/consultUser', {usuarios : usuarios.data })
          //  }else{
                
          //  }
    } catch (err) {
        res.status(500).send("API OUT OF WORK");
        console.error(err)
    }

}

const postRegistUser = async(req, res) =>{

    try {
        console.log(USERAUTH_ENDPOINT + '/registro')
        const erros = await axios.post( USERAUTH_ENDPOINT + '/registro', req.body)
        
       /*} if(erros.data.status = 1){
            res.render('usuarios/registro', {error : erros.data.erro })   
        else{
            req.flash("success_msg", "DEU CERTO")
            res.redirect('/usuarios/registro');
        }
        */
       res.send(erros.data)
        
    } catch (err) {
        res.status(500).send("API OUT OF WORK");
        console.error(err)
        
    }


}


module.exports = {
    postconsultUser,
    postRegistUser
}
