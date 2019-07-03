const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {validateAddFields, validateEditFields, validateLoginFields, validateRegisterFields} = require('../middlewares/validateFields');


router.get('/login', (req, res) => {
  res.render('users/login');
});

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', validateRegisterFields, (req, res) => {
  res.redirect('/')
});

router.post('/login', validateLoginFields, (req, res) => {
  res.redirect('/')
});


module.exports = router;