const {
    postconsultUser,
    postRegistUser,
    getDeleteUser,
    getconsultUserWithID, 
    putEditUser
} = require('../controller/user')

const {
    postLogin,
    postLogout
} = require('../controller/auth')
  
module.exports = app => {
    
    //Users
    app.post('/usuarios/consultUser', postconsultUser)//Consulta de Usuários
    app.get('/usuarios/consultUser/:id', getconsultUserWithID)
    app.post('/usuarios/registro', postRegistUser) //Registro de novos usuários

    //Deletar
    app.delete('/usuarios/exc/:id', getDeleteUser)
    
    //UPDATE
    app.put('/usuarios/edit', putEditUser)



    //LOGIN
    app.post('/auth/login', postLogin)//LOGIN
    app.post('/auth/logout', postLogout) //LOGOUT

}
