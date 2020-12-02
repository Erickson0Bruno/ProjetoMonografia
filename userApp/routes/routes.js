const passport = require("passport")
const {AuthenticatedUser, Admin, isTOKEN} = require('../helpers/verificaAdmin')

const {
    getconsultUser,
    postconsultUser,
    postRegistUser,
    getDeleteUser,
    getEditUser,
    postEditUser
} = require('../controller/user')

const {
    postLogin
} = require('../controller/admin')

const {
    getQuestions,
    postQuestion,
    postLikeQuestion,
    postDislikeQuestion
} = require('../controller/questions')

module.exports = app => {
//Home
    
    app.get('/', AuthenticatedUser, (req, res) =>{
        //console.log(req.session.user)
        res.render("admin/home.handlebars");
    })

    //Users
    
    //Consulta
    app.get('/usuarios/consultUser', AuthenticatedUser,(req, res) =>{
        res.render("usuarios/consultUser");
    }) 
    app.post('/usuarios/consultUser', AuthenticatedUser, postconsultUser)

    //Registro
    app.get('/usuarios/registro',  AuthenticatedUser, (req, res) => {
        res.render('usuarios/registro.handlebars');
    })
    app.post('/usuarios/registro', AuthenticatedUser, postRegistUser)

    //Deletar
    app.get('/usuarios/exc/:id', AuthenticatedUser, getDeleteUser)

    //Alterar
    app.get('/usuarios/edit/:id', AuthenticatedUser, getEditUser)
    app.post('/usuarios/edit/',AuthenticatedUser,  postEditUser)
    

    //LOGIN AND LOGOUT
    app.get('/auth/login', (req, res) =>{
        res.render("admin/admin.handlebars");
    })
    app.get('/auth/logout', (req, res) =>{
        res.locals.user = null
        req.session.token = null
        req.session.user = null
        req.flash("success_msg", "Usuário deslogado!")
          
         res.redirect("/auth/login");
    })
    app.post('/auth/login', postLogin)

    //LERARNING STYLE
    app.get('/learningstyle', AuthenticatedUser, getQuestions)
    //app.post('/learningstyle/like/:id_question', postLikeQuestion)
    //app.post('/learningstyle/dislike/:id_question', postDislikeQuestion)


    
}
