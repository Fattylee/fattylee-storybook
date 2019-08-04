const express = require('express');
const {join} = require('path');
const fs = require('fs');
const util = require('util');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const router = express.Router();
const User = require('../models/User');
const Story = require('../models/Story');
const Comment = require('../models/Comment');
const {validateAddFields, validateEditFields, validateLoginFields, validateRegisterFields, validateProfileFields} = require('../middlewares/validateFields');
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
router.patch('/me', isAuthenticated, validateProfileFields, async (req, res) => {
  let filename = undefined;
   const avatarPath = join(__dirname, '../public/img/uploads/avatars/');
  const prevAvatar = req.user.avatar;
  
  if(req.files){
    const {avatar} = req.files;
     if(avatar.size > 2 * 1000 * 1000) {
    req.flash('error_msg', 'Image size cannot exceed 2mb');
    return res.redirect('/users/me');
  }
    if(!/^image\/.*$/i.test(avatar.mimetype)) {
    req.flash('error_msg', 'file type not supported, pls use a valid image file (jpeg, png, jpg, gif)');
    return res.redirect('/users/me');
  }
    
    filename = `${uuid()}-${avatar.name}`;
    // save avatar to storage
    await util.promisify(avatar.mv)(avatarPath + filename);
    
  }
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.userValue.password, salt);
    
    // update avatar name ref in mongoose
    const update = await User.findByIdAndUpdate(req.user._id, { 
    avatar: filename ? filename : prevAvatar,
    password: hash,
    }, {new: true});
    // delete prevAvatar if not stock
    if(prevAvatar !== 'avatar_placeholder.png') {
      await util.promisify(fs.unlink)(avatarPath + prevAvatar).catch(debug);
    }
   req.flash('success_msg', 'profile update was successful');
    res.redirect('/users/me');    
});

// delete account
router.delete('/me', isAuthenticated, async (req, res) => {
  const { _id: id } = req.user;
  
  // get all users stories
  const stories = await Story.find({user: id});
  
  let allStoryComments = [];
  stories.forEach(({comments}) => {
    allStoryComments = [...allStoryComments, ...comments.map( id => Comment.findByIdAndRemove(id) )];
  });
  
  const result = await Promise.all([
  Story.deleteMany({user: id}),
  allStoryComments,
  Comment.deleteMany({owner: id}),
  User.findByIdAndRemove(id),
  ]);
  
  req.flash('success_msg', 'your account was deleted successfully')
  res.redirect('/users/login');
});

/*
router.all('/*', (req, res, next) => {
  res.send('404 not found, Users');
});*/

module.exports = router;

