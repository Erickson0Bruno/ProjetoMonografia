const express = require('express');
const router = express.Router();
const passport = require("passport")

router.get('/', authenticationMiddleware (),(req, res) => {
    res.render("admin/home.handlebars");

}); 
 
function authenticationMiddleware () {  
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.render('admin/admin.handlebars')
  }
}

module.exports = router
