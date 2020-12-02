const SECRET = "164fee6cc59730e452b0eca679499a1e"//require('../config/authorization')

module.exports ={
    Admin: function(req, res, next){
         if(req.user && req.user.eAdmin == '1'){
            return next()
        }else{
            req.flash("error_msg", "Usuário precisa estar autenticado e ser um Administrador")
            res.redirect('/auth/login');
        }
    },

    AuthenticatedUser: function(req, res, next){
        
        if(req.session.user != undefined){
            return next()
        }else{
            req.flash("error_msg", "Usuário precisa estar autenticado")
            res.redirect('/auth/login');
        }
    },

    isTOKEN : function(req, res, next){
        const token = req.token
        if(req.token == null && req.token == undefined && req.token == ''){
            
            req.flash("error_msg", "Sem Token")
            res.redirect('/');
            
        }else{
            return next()
        }

    }


}