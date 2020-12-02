const { LOGIN_ENDPOINT } = require('../config/api_endpoints')
const axios = require('axios');


const postLogin = async (req, res) => {
    
    try {
        console.log(LOGIN_ENDPOINT + '/login')
        const retorno = await axios.post( LOGIN_ENDPOINT + '/login', req.body)
        res.send(retorno.data)
        
    } catch (err) {
        res.status(500).send("API OUT OF WORK");
        console.log(err.response.data.return_msg)
        
    }

}

const postLogout = async(req, res) =>{

}


module.exports = {
    postLogin,
    postLogout
}
