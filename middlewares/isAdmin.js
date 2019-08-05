module.exports = (req, res, next) => {
  
  if(!req.user.isAdmin){
    req.flash('error_msg', 'Unauthorized, no admin privilege');
    return res.redirect('/stories');
  }
  next();
};
