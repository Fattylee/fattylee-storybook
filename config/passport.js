const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  
  passport.use(new LocalStrategy(
  {usernameField: 'email'}, 
  async (email, password, done) => {
    console.log('email', email, 'password', password);
    const user = await User.findOne({email});
    if(!user) return done(null, false, {message: 'Email not found'});
    if(!user.isValidPassword()) return done(null, false, {message: 'Password is incorrect'});
    
    return done(null, user);
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id).catch(err => done(err, null));
    
    return done(null, user);
  });
}

