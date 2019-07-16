const router = require('express').Router();
const Story = require('../models/Story');

router.get('/', async (req, res) => {
  console.log('req.user', req.user);
  const stories = await Story.find({status: 'public'})
  //.populate('user', 'email ')
  .sort('-date');
  console.log('stories', stories, 'req.user', req.user);
  res.render('index', { stories, pageTitle: req.user ? 'Feeds':'Welcome'});
 
 
  /*const people = [
    {name: 'abdullah'},
    {name: 'fattylee'}
  ];
  res.render('index', {
    pageTitle: 'Welcome', 
    people, 
    author: {name: 'Gold smith'},
    helpers: {
      abu(str) {
        return this.pageTitle === str ? this.pageTitle :'Gives nothing';
      },
      abdullah(str = '', options) {
        if(str === 'fab')
        return options.fn(this);
        return options.inverse(this);
      },
    },
    }); */
});


router.get('/about', (req, res) => {
  res.render('about', {pageTitle: 'About'});
});

router.all('/*', (req, res, next) => {
  res.send('404 not found, Public');
});


module.exports = router;