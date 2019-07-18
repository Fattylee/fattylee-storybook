const redirectToLogin = (req, res, next) => {
  if(req.user) return res.redirect('/stories');
  next();
}


exports.redirectToLogin = redirectToLogin;

