const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User')
const {validateAddFields, validateEditFields, validateLoginFields, validateRegisterFields} = require('../middlewares/validateFields');
const passport = require('passport');
const authLogout = require('../middlewares/authLogout');
const debug = require('debug')('active:app');
const { redirectToLogin } = require('../helpers/redirect');

router.use((req, res, next) => {
  req.app.locals.layout = 'container';
  next();
});

router.get('/', async (req, res) => {
  
  const users = await User.find().sort('-createdAt').select('email name').limit(20);
  
  res.status(200).json(users);
});

router.get('/login', redirectToLogin, async (req, res) => {
  
  res.render('users/login', {pageTitle: 'Login'});
}, async function (req, res) {
  res.send('last route after login');
});

router.get('/logout', authLogout, (req, res) => {
  req.logout();
  req.flash('success_msg', 'Your logout was successful')
  res.redirect('login');
});

router.get('/register', redirectToLogin, (req, res) => {
  res.render('users/register', {pageTitle: 'Register'});
});


router.post('/register', validateRegisterFields, async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      ...req.userValue,
      password: hash,
    });
    const newUser = await user.save();
    req.flash('success_msg', 'You are now registered, pls login');
    res.redirect('/users/login');
});

router.post(
  '/login', 
  validateLoginFields, 
  passport.authenticate(
    'local', 
    {
      failureRedirect: '/users/login', 
      failureFlash: 'Invalid email or password', 
      successFlash: 'Your login was successful', //this will override the message defined at passport stragety callback
      successRedirect: '/stories'
    }));
/*
router.all('/*', (req, res, next) => {
  res.send('404 not found, Users');
});*/

module.exports = router;