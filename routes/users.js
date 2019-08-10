const {Storage} = require('@google-cloud/storage');
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
const { redirectToLogin } = require('../helpers/redirect');
const isAuthenticated = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');


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
router.get('/login', redirectToLogin, async (req, res) => {
  
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
router.get('/register', redirectToLogin, (req, res) => {
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
      //session: false, //default option is true, session can be turned off by allow this line of code
    })
);// end login user using passport

// show profile page
router.get('/me', isAuthenticated, async (req, res) => {
  res.render('users/profile', {pageTitle: 'Profile', user: req.user});
});// end show profile page

// update profile info
router.patch('/me', isAuthenticated, validateProfileFields, async (req, res, next) => {
  
  /*if (!req.file) {
  res.status(400).send("No file uploaded.");
  return;
  }*/
  /*
  
  debug('req. files', req. files);
  
  
  // save to google-cloud storage
   // const file = await bucket.upload(filename, {public: true});

// instanstiate gcs
  const gc = new Storage({
    keyFilename: join(__dirname, '../config/fattylee-storybook-img-458bbee95310.json'),
    projectId: 'fattylee-storybook-img',
  });
  
  
  // create a bucket
  const bucket = gc.bucket('storybook-uploads');
  
  
	// Create a new blob in the bucket and upload the file data.
	const blob = bucket.file('stories/' + req.files.avatar.name);
	
//bucket.file(req.file.originalname);
	
	// Make sure to set the contentType metadata for the browser to be able
	// to render the image instead of downloading the file (default behavior)
	const blobStream = blob.createWriteStream({
	metadata: {
	contentType: req.files.avatar.mimetype, //req.file.mimetype
	}
	});
	
	
	blobStream.on("error", err => {
	next(err);
	return;
	});
	
	blobStream.on("finish", () => {
	// The public URL can be used to directly access the file via HTTP.
	const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
	
	// Make the image public to the web since we'll be displaying it in browser
	
	/*blob.makePublic().then(() => {
	res.status(200).send(`Success!\n Image uploaded to ${publicUrl}`);
	}); /
	res.redirect('/users/me');
});	

 blobStream.end(req.files.avatar.data //req.file.buffer
 );

 debug('google-cloud file upload');
 */
  
  
  
  
  
  let filename = undefined;
   const avatarPath = join(__dirname, '../public/img/uploads/avatars/');
  const prevAvatar = req.user.avatar;
  
  if(req.files){
    const {avatar} = req.files;   
    if(avatar.size > 2 * 1024 * 1024) {
    req.flash('error_msg', 'Image size cannot exceed 2mb');
    return res.redirect('/users/me');
  }
    if(!/^image\/.*$/i.test(avatar.mimetype)) {
    req.flash('error_msg', 'file type not supported, pls use a valid image file (jpeg, png, jpg, gif)');
    return res.redirect('/users/me');
  }
    
    filename = `${uuid()}-${avatar.name}`;
    // save avatar to storage
    const mv = await util.promisify(avatar.mv)(avatarPath + filename);
  }
  
    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.userValue.password, salt);
    
    // update avatar name ref in mongoose
    const update = await User.findByIdAndUpdate(req.user.id, { 
    avatar: filename ? filename : prevAvatar,
    password: hash,
    }, {new: true});
    // delete prevAvatar if not stock
    if(prevAvatar !== 'avatar_placeholder.png') {
      await util.promisify(fs.unlink)(avatarPath + prevAvatar).catch(debug);
    }
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
  
  req.flash('success_msg', 'your account was deleted successfully')
  res.redirect('/users/login');
});// end delete account

/*
router.all('/*', (req, res, next) => {
  res.send('404 not found, Users');
});*/

module.exports = router;