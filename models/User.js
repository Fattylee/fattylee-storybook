const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

const UserSchema =  new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }, 
}, {usePushEach: true});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);