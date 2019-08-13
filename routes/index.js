const router = require('express').Router();
const Story = require('../models/Story');
const debug = require('debug')('active:app');


router.all('/*', ( req, res, next ) => {
  //req.app.locals.layout = 'main';
  next()
  });
  
// display on public stories on the index page
router.get('/', async (req, res) => {
  const stories = await Story.find({status: 'public'})
  .populate('user', 'name')
  .sort('-updatedAt');
  res.render('index', { stories, pageTitle: req.user ? 'Feeds' : 'Welcome' });
 
});

router.get('/about', (req, res) => {
  res.render('about', {pageTitle: 'About'});
});

router.get('/privacy', (req, res) => {
  res.render('privacy', {pageTitle: 'Privacy'});
});

router.all('/*', (error, req, res, next) => {
  res.send('ASYNC ERROR FOR INDEX: ' + error);
});

module.exports = router;