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
  password: String,
  avatar: {
    type: String,
    default: 'avatar_placeholder.png',
  },
  facebookId: String,
  googleId: String,
  isAdmin: Boolean,
}, {usePushEach: true, timestamps: true });

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);