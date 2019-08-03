const LocalStrategy = require('passport-local').Strategy;
FacebookStrategy = require('passport-facebook').Strategy; 
const User = require('../models/User');
const { facebook, google } = require('./dev');
const debug = require('debug')('active:app');

module.exports = (passport) => {
  
  passport.use(new LocalStrategy(
  {usernameField: 'email'}, 
  async (email, password, done) => {
    
    const user = await User.findOne({email});
    if(!user) return done(null, false, {message: 'Email not found'});
    const result = await user.isValidPassword(password).catch(err => console.error('bcrypt password err', err));
    
    if(!result) return done(null, false, {message: 'Password is incorrect'});
    
    return done(null, user, {message: 'na so u enter finish'});
  })); // end LocalStrategy
  
  passport.use(new FacebookStrategy({
    clientID: facebook.clientID, 
    clientSecret: facebook.clientSecret, 
    callbackURL: "http://localhost:4000/auth/facebook/redirect",
    profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'name'],
     }, 
   async (accessToken, refreshToken, profile, done) => {
     debug('profile', profile._json);
     const {id: facebookId, name, email, picture: {data: {url: avatar}} } = profile._json;
     debug(facebookId, name, email, avatar);
     // change avatar size
     const newStr = avatar.replace(/(?<=(&height=|&width=))50/ig, '100');
     debug('newStr', newStr);
     //return;
     const currentUser = await User.findOne({email});
     if(currentUser) {
       debug('existed');
       if(currentUser.avatar === 'avatar_placeholder.png') {
         // update avatar of iser using the social media link
       }
       done(null, currentUser); 
     }
     else {
       debug('does not exist, create one');
       const user = new User({
         facebookId, name, email, avatar
       });
       const newUser = await user.save();
       done(null, newUser);
     }
   })); // end FacebookStrategy
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).catch(err => done(err, null));
    
    done(null, user);
  });
}