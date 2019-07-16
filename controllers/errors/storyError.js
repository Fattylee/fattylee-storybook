module.exports = (error, req, res, next) => {
  if(error.message.includes('not a valid enum')) {
    //req.flash('error_msg', '"value" not a valid status field');
    console.log('storyError ========', req.storyValue);
    return res.render('stories/add', {
      errors: [{error: 'not a valid enum'}], 
      story: req.storyValue, 
      pageTitle: 'Create story'});
  }
  console.log('story async error', error);
  res.send('story async error ' + error.message);
};