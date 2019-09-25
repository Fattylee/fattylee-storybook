const debug = require('debug')('active:app');

module.exports = (req, res, next) => {
  
  if(!req.isAuthenticated()){ 
    req.flash('error_msg', 'You are not logged in, pls login');
    return res.redirect('/users/login');
  }
  next();
};

