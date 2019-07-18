const router = require('express').Router();
const Story = require('../models/Story');

router.get('/', async (req, res) => {
  const stories = await Story.find({status: 'public'})
  .populate('user', 'name -_id')
  .select('date')
  .sort('-date');
  return console.log('stories', stories, 'req.user', req.user);
  res.render('index', { stories, pageTitle: req.user ? 'Feeds' : 'Welcome' });
 
});


router.get('/about', (req, res) => {
  res.render('about', {pageTitle: 'About'});
});

router.all('/*', (req, res, next) => {
  res.send('404 not found, Public');
});


module.exports = router;

