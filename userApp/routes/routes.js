const passport = require("passport")
const {AuthenticatedUser} = require('../helpers/verificaAdmin')

const {
    getconsultUser,
    postconsultUser,
    postRegistUser
} = require('../controller/user')


  
module.exports = app => {
//Home
    /*
    app.get('/', (req, res) =>{
        res.render("admin/home.handlebars");
    })
    */
    app.get('/', (req, res) => {
        if(req.query.fail)
        res.render('admin/admin.handlebars', { message: 'Usuário e/ou senha incorretos!' });
      else
        res.render('admin/admin.handlebars', { message: null });
        
    });

    app.post("/", (req, res, next) =>{
        //res.send("Email: " + req.body.email);
    //console.log("Passou pelo metodo POST")  
    
        passport.authenticate("local", {
            successRedirect : "/",
            failureRedirect : "/",
            failureFlash : true
            
        })(req,res, next)
    
    
    
    })

//Users
    //Consulta
    app.get('/usuarios/consultUser', AuthenticatedUser,(req, res) =>{
        res.render("usuarios/consultUser");
    }) 
    app.post('/usuarios/consultUser',AuthenticatedUser, postconsultUser)

    //Registro
    app.get('/usuarios/registro', AuthenticatedUser, (req, res) => {
        res.render('usuarios/registro.handlebars');
    })
    app.post('/usuarios/registro', AuthenticatedUser, postRegistUser)

    

//LOGIN AND LOGOUT
/*    
app.get('/admin/login', (req, res) =>{
        res.render("admin/admin.handlebars");
    })
    */
    app.get('/admin/login', function(req, res){
        if(req.query.fail)
          res.render('admin/admin.handlebars', { message: 'Usuário e/ou senha incorretos!' });
        else
          res.render('admin/admin.handlebars', { message: null });
      })
      
      
      app.post("/admin/login", (req, res, next) =>{
          //res.send("Email: " + req.body.email);
         //console.log("Passou pelo metodo POST")  
      
          passport.authenticate("local", {
              successRedirect : "/",
              failureRedirect : "/admin/login",
              failureFlash : true
              
          })(req,res, next)
      
      
      
      })
    
}
