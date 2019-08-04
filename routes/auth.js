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
router.get('/abu', async (req, res) => {
  res.send('working')
});

router.get('/facebook', passport.authenticate('facebook', {scope: 'email'})); 


router.get('/facebook/redirect',
passport.authenticate('facebook',
  {
    successRedirect: '/stories/', 
    failureRedirect: '/users/login',
    failureFlash: 'Invalid email or password', 
    successFlash: 'Your login was successful',
  })
); // end facebook authentication

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']})); 


router.get('/google/redirect',
passport.authenticate('google',
  {
    successRedirect: '/stories/', 
    failureRedirect: '/users/login',
    failureFlash: 'Invalid email or password', 
    successFlash: 'Your login was successful',
  })
); // end google authentication
 

module.exports = router;