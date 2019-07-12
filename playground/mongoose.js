const express = require('express');
const mongoose = require('mongoose');
const app = express();
//require('../models/User');

const User = mongoose.model('user', {});
mongoose.connect('mongodb://localhost/expert').then(res => {
  console.log('connected to mongodb');
  const port = 8000;
 app.listen(port, () => console.log('Server connected successfully'));
})
.catch(err => console.error('Could not connect to db'));


app.get('/users', async (req, res) => {
  try {
    const newUser = await new User({email: 'okay_aba1@gmail'}).save();
    console.log('new user', newUser);
    //await User.findByIdAndRemove('5d23b2e8ff4f5322ac5fb8ad');
    const users = await User.find().select('email');
    console.log('users', users);
    res.json(users);
  }
  catch(err) {
    res.json(err);
  }
});
