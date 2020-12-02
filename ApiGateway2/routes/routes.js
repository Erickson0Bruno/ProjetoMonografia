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

const {
    postLikeQuestion,
    postDislikeQuestion
} = require('../controller/questions')
  
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


     //LERARNING STYLE
    app.post('/learningstyle/like/:id_question', postLikeQuestion)
    app.post('/learningstyle/dislike/:id_question', postDislikeQuestion)
    //app.post('/questions/:id_question', postQuestion)


}
