const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  
  passport.use(new LocalStrategy(
  {usernameField: 'email'}, 
  async (email, password, done) => {
    
    const user = await User.findOne({email});
    if(!user) return done(null, false, {message: 'Email not found'});
    const result = await user.isValidPassword(password).catch(err => console.error('bcrypt password err', err));
    
    if(!result) return done(null, false, {message: 'Password is incorrect'});
    
    return done(null, user, {message: 'na so u enter finish'});
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async(id, done) => {
    const user = await User.findById(id).catch(err => done(err, null));
    
    return done(null, user);
  });
}