const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User')
const {validateAddFields, validateEditFields, validateLoginFields, validateRegisterFields} = require('../middlewares/validateFields');

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
    req.flash('success_msg', 'registration was successful');
    res.redirect('/stories')
  }
  catch(err) {
    const errors = req.errors;
    if(err.message.includes('duplicate key error')) errors.push({error: `email "${req.user.email}" already registered`});
    res.render('users/register', {errors, user: req.user, pageTitle: 'Error'})
  }
  
});

router.post('/login', validateLoginFields, (req, res) => {
  req.flash('success_msg', 'Your login was successful')
  res.redirect('/')
});


module.exports = router;