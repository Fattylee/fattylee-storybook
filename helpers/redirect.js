const redirectLogin = (req, res, next) => {
  if(req.user) return res.redirect('/stories');
  next();
}

exports.redirectLogin = redirectLogin;

