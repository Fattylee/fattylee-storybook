const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { facebook, google } = require('./keys');
const debug = require('debug')('active:app');



module.exports = (passport) => {
  
  passport.use(new LocalStrategy(
  {usernameField: 'email'}, 
  async (email, password, done) => {
   try {
      const user = await User.findOne({email});
      
      if(!user) return done(null, false, {message: 'Email not found'});
      
      const result = await user.isValidPassword(password).catch(err => {
        throw  {message: 'Login failed, please try again later', err};
      });
      if(!result) return done(null, false, {message: 'Password is incorrect'});
       
      return done(null, user, {message: 'na so u enter finish'});
    }
   catch(err) {
     if(err.err) debug('bcrypt err', err.err);
      debug(' err', err);
   return done(null, false, {message: err.message});  
    }; 
  })); // end LocalStrategy
  
  passport.use(new FacebookStrategy({
    clientID: facebook.clientID, 
    clientSecret: facebook.clientSecret, 
    callbackURL: facebook.callbackURL,
    profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'name'],
     }, 
   async (accessToken, refreshToken, profile, done) => {
     const { id: facebookId, name, email } = profile._json;
     // change avatar size
     const avatar = `https://graph.facebook.com/${facebookId}/picture?type=large`;
     
     const currentUser = await User.findOne({email});
     if(currentUser) {
       if(currentUser.avatar === 'images.png') {
         // update avatar of user using the social media link
         currentUser.avatar = avatar;
         const updatedUser = await currentUser.save(); 
         done(null, currentUser); 
       }
       else {
         done(null, currentUser); 
       }
     }
     else {
       const user = new User({
         facebookId, name, email, avatar
       });
       const newUser = await user.save();  
       done(null, newUser);
     }
   })); // end FacebookStrategy
  
  passport.use(new GoogleStrategy({
    clientID: google.clientID, 
    clientSecret: google.clientSecret, 
    callbackURL: google.callbackURL,
     }, 
   async (accessToken, refreshToken, profile, done) => {
     const {sub: googleId, name, email, picture: avatar } = profile._json;
     debug('avatar', avatar);
     const currentUser = await User.findOne({email});
     if(currentUser) {
       debug('user already exist', currentUser);
       if(currentUser.avatar === 'images.png') {
         debug('user already exist with default avatar do ur swapping here')
         // update avatar of user using the social media link
       //  currentUser.avatar = avatar;
      //   const updatedUser = await currentUser.save();
         done(null, currentUser); 
       }
       else {
         debug('user already exist with his own custom avatar');
         done(null, currentUser); 
       }
     }
     else {
       const user = new User({
         googleId, name, email, avatar
       });
       const newUser = await user.save();
       debug('new user', newUser);
       done(null, newUser);
     }
   })); // end GoogleStrategy
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id).catch(err => done(err, null));
    
    done(null, user);
  });
}