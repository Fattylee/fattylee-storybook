const debug = require('debug')('active:app');

module.exports = (req, res, next) => {
  
  if(!req.isAuthenticated()){
    console.log('logout b4 req.logout', req.user);
    debug('logout b4 req.logout', req.user, 'isAuthenticated', req.isAuthenticated());
    req.flash('error_msg', 'You are not logged in, pls login');
    return res.redirect('/users/login');
  }
  next();
};
