const express = require('express');
const {join} = require('path');
const fs = require('fs');
const util = require('util');
const bcrypt = require('bcryptjs');
const uuid = require('uuid/v1');
const router = express.Router();
const User = require('../models/User');
const Story = require('../models/Story');
const Comment = require('../models/Comment');
const {validateAddFields, validateEditFields, validateLoginFields, validateRegisterFields, validateProfileFields} = require('../middlewares/validateFields');
const passport = require('passport');
const authLogout = require('../middlewares/authLogout');
const debug = require('debug')('active:app');
const { redirectToStories } = require('../helpers/redirect');
const isAuthenticated = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const storage = require('../helpers/googleCloudService');


router.use((req, res, next) => {
  //req.app.locals.layout = 'container';
  
  next();
});

// get user only admin can perform action
router.get('/', isAuthenticated, isAdmin, async (req, res) => {
  const users = await User.find().sort('-createdAt').select('email name').limit(20);
  
  res.status(200).json(users);
});// end get user only admin can perform action

// login page
router.get('/login', redirectToStories, async (req, res) => {
  
  res.render('users/login', {pageTitle: 'Login'});
}, async function (req, res) {
  res.send('last route after login');
});// end login page

// logout user 
router.get('/logout', authLogout, (req, res) => {
  req.logout();
  req.flash('success_msg', 'Your logout was successful')
  res.redirect('login');
}); // end logout user

// display register form
router.get('/register', redirectToStories, (req, res) => {
  res.render('users/register', {pageTitle: 'Register'});
});// end display register form

// create new user
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
});// end create new user

// login user using passport
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
      //session: false, //default option is true, session can be turned off by allowing this line of code
    })
);// end login user using passport

// show profile page
router.get('/me', isAuthenticated, async (req, res) => {
  res.render('users/profile', {pageTitle: 'Profile', user: req.user});
});// end show profile page

// update profile info
router.patch('/me', isAuthenticated, validateProfileFields, async (req, res, next) => {
  
  let filename = req.body.avatar;
   
  const prevAvatar = req.user.avatar;
  
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.userValue.password, salt);
    
    // update avatar name ref in mongoose
    const update = await User.findByIdAndUpdate(req.user.id, { 
    avatar: filename ? filename : prevAvatar,
    password: hash,
    }, {new: true});
    // delete prevAvatar if not default
    if(filename && prevAvatar !== 'images.png'){
      storage
    .bucket('storybook_uploads')
    .file(prevAvatar)
    .delete().catch(err => debug(err));
    }
    
    //debug('update', update);
    
   req.flash('success_msg', 'profile update was successful');
    res.redirect('/users/me');    
    
});// end update profile info

// delete account
router.delete('/me', isAuthenticated, async (req, res) => {
  const { id } = req.user;
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
  
  const [files] = await storage.bucket('storybook_uploads').getFiles();
  
   files.forEach(file => {
     if(file.name.startsWith(id)){
       file.delete().catch(err => debug(err));
     }
   }); // END 
  
  req.flash('success_msg', 'your account was deleted successfully')
  res.redirect('/users/login');
});// end delete account

/*
router.all('/*', (req, res, next) => {
  res.send('404 not found, Users');
});*/


module.exports = router;