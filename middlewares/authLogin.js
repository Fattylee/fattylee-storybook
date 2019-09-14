const debug = require('debug')('active:app');

module.exports = (req, res, next) => {
  
  if(req.isAuthenticated()){ 
    req.flash('success_msg', 'You are already logged in');
    return res.redirect('/stories');
  }
  next();
};