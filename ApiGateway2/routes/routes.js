const {
    postconsultUser,
    postRegistUser
} = require('../controller/user')

const {
    postLogin,
    postLogout
} = require('../controller/auth')
  
module.exports = app => {
    
    //Users
    app.post('/usuarios/consultUser', postconsultUser)//Consulta de Usuários
    app.post('/usuarios/registro', postRegistUser) //Registro de novos usuários


    //LOGIN
    app.post('/auth/login', postLogin)//LOGIN
    app.post('/auth/logout', postLogout) //LOGOUT

}
