const router = require('express').Router();


router.get('/', (req, res) => {
  res.render('index', {pageTitle: 'Welcome'});
});


router.get('/about', (req, res) => {
  res.render('about', {pageTitle: 'About'});
});

module.exports = router;

