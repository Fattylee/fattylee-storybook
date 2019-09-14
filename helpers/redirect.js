const redirectToStories = (req, res, next) => {
  if(req.isAuthenticated()) return res.redirect('/stories');
  next();
}


exports.redirectToStories = redirectToStories;