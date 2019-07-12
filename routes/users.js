const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User')
const {validateAddFields, validateEditFields, validateLoginFields, validateRegisterFields} = require('../middlewares/validateFields');
const passport = require('passport');

router.get('/', async (req, res) => {
  const users = await User.find().sort('-date').select('email name').limit(20);
  //const userExist = await User.findOne({email: 'fatai4humility@yahoo.com '});
  res.status(200).json(users);
});

router.get('/login', (req, res) => {
  res.render('users/login', {pageTitle: 'Login'});
});

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
    res.status(500).render('')
  }
});

router.post('/login', validateLoginFields, passport.authenticate('local', {failureRedirect: 'login', failureFlash: true}), (req, res, next) => {
  /*
  passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: true,
    successRedirect: '/stories',
  })(req, res, next);
  */
  req.flash('success_msg', 'Your login was successful')
  res.redirect('/stories')
});


module.exports = router;

