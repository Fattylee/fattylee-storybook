const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User')
const {validateAddFields, validateEditFields, validateLoginFields, validateRegisterFields} = require('../middlewares/validateFields');
const passport = require('passport');
const authLogout = require('../middlewares/authLogout');
const debug = require('debug')('active:app');
const { redirectLogin } = require('../helpers/redirect');


router.get('/', async (req, res) => {
  const users = await User.find().sort('-date').select('email name').limit(20);
  
  res.status(200).json(users);
});

router.get('/login', redirectLogin, async (req, res) => {
  res.render('users/login', {pageTitle: 'Login'});
});
router.get('/logout', authLogout, (req, res) => {
  req.flash('success_msg', 'Your logout was successful')
  res.redirect('login');
})

router.get('/register', (req, res) => {
  res.render('users/register', {pageTitle: 'Register'});
});


router.post('/register', validateRegisterFields, async (req, res) => {
  try {
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      ...req.body,
      password: hash,
    });
    const newUser = await user.save();
    req.flash('success_msg', 'You are now registered, pls login');
    res.redirect('/users/login')
  }
  catch(err) {
    if(err.message.includes('duplicate key error')) {
      req.flash('error_msg', `email "${req.userValue.email}" already registered, pls login to your account`);
    return res.redirect('login');
    }
    res.status(500).render('error/500');
  }
});

router.post('/login', validateLoginFields, passport.authenticate('local', {failureRedirect: 'login', failureFlash: true}), (req, res, next) => {
  
  req.flash('success_msg', 'Your login was successful');
  res.redirect('/stories')
});

router.all('/*', (req, res, next) => {
  res.send('404 not found, Users');
});

module.exports = router;