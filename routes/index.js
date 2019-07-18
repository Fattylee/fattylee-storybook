const router = require('express').Router();
const Story = require('../models/Story');
const debug = require('debug')('active:app');

router.all('/*', (error, req, res, next) => {
  res.send('ASYNC ERROR FOR INDEX: ' + error);
});

router.get('/', async (req, res) => {
  
  const stories = await Story.find({})
  .populate('user', 'name')
  .sort('-updatedAt');
  
  res.render('index', { stories, pageTitle: req.user ? 'Feeds' : 'Welcome' });
 
});


router.get('/about', (req, res) => {
  res.render('about', {pageTitle: 'About'});
});

router.all('/*', (req, res, next) => {
  res.send('404 not found, Public');
});


module.exports = router;

