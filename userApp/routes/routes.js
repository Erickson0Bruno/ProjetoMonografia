const {
    getconsultUser,
    postconsultUser,
    postRegistUser
} = require('../controller/user')


  
module.exports = app => {
    //Home
    app.get('/', (req, res) =>{
        res.render("admin/home.handlebars");
    })

    //Users
    app.get('/usuarios/consultUser', getconsultUser)
    app.post('/usuarios/consultUser', postconsultUser)

    app.get('/usuarios/registro',  (req, res) => {
        res.render('usuarios/registro.handlebars');
    })
    app.post('/usuarios/registro', postRegistUser)

    //LOGIN

}
