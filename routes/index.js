const router = require('express').Router();


router.get('/', (req, res) => {
  console.log('root / req.user', req.user);
  const people = [
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
    }); 
});


router.get('/about', (req, res) => {
  res.render('about', {pageTitle: 'About'});
});

module.exports = router;