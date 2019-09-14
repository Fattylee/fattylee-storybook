const redirectToStories = (req, res, next) => {
  //if(req.isAuthenticated) 
  if(req.user) return res.redirect('/stories');
  next();
}


exports.redirectToStories = redirectToStories;