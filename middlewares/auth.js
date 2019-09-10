module.exports = (req, res, next) => {
  
  if(!req.isAuthenticated()){
    req.flash('error_msg', 'Not authenticated, please login');
    return res.redirect('/users/login');
  }
  next();
};
