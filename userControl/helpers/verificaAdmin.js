
module.exports ={
    Admin: function(req, res, next){
         if(req.isAuthenticated() && req.user.eAdmin == '1'){
            return next()
        }else{
            req.flash("error_msg", "Usuário precisa estar autenticado e ser um Administrador")
            res.redirect('/');
        }

    },

    AuthenticatedUser: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }else{
            req.flash("error_msg", "Usuário precisa estar autenticado")
            res.redirect('/');
        }


    }


}