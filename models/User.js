const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = mongoose.model('user', new Schema({
  name: String,
  email: String,
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}));

module.exports = User;