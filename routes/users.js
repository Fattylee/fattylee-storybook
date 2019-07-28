const express = require('express');
const {join} = require('path');
const fs = require('fs');
const util = require('util');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const router = express.Router();
const User = require('../models/User')
const {validateAddFields, validateEditFields, validateLoginFields, validateRegisterFields} = require('../middlewares/validateFields');
const passport = require('passport');
const authLogout = require('../middlewares/authLogout');
const debug = require('debug')('active:app');
const { redirectToLogin } = require('../helpers/redirect');
const isAuthenticated = require('../middlewares/auth');


router.use((req, res, next) => {
  //req.app.locals.layout = 'container';
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
      successRedirect: '/stories',
      //session: false, //default option is true, session can be turned off by allow this line of code
    })
);

// show profile page
router.get('/me', isAuthenticated, async (req, res) => {
  res.render('users/profile', {pageTitle: 'Profile', user: req.user});
});

// update profile info
router.patch('/me', isAuthenticated, async (req, res) => {
  if(!req.files){
    req.flash('error_msg', 'no selected picture');
    return res.redirect('/users/me');
  }
  if(req.files.avatar.size > 2 * 1000 * 1000) {
    req.flash('error_msg', 'Image size cannot exceed 2mb');
    return res.redirect('/users/me');
  }
  if(!/^image\/.*$/i.test(req.files.avatar.mimetype)) {
    req.flash('error_msg', 'file type not supported, pls use a valid image file (jpeg, png, jpg, gif)');
    return res.redirect('/users/me');
  }
  
    const {avatar} = req.files;
    const filename = `${new Date()}-${avatar.name}`;
    const avatarPath = join(__dirname, '../public/img/uploads/avatars/');
    const prevAvatar = req.user.avatar;
    // save avatar to storage
    await util.promisify(avatar.mv)(avatarPath + filename);
    // update avater name ref in mongoose
    const update = await User.findByIdAndUpdate(req.user._id, { avatar: filename,}, {new: true});
    // delete prevAvatar is not stock
    if(prevAvatar !== 'avater_placeholder.png') {
      await util.promisify(fs.unlink)(avatarPath + prevAvatar).catch(debug);
    }
   req.flash('success_msg', 'profile update was successful');
    res.redirect('/users/me');    
  
  
});

/*
router.all('/*', (req, res, next) => {
  res.send('404 not found, Users');
});*/

module.exports = router;

