const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { facebook, google } = require('./keys');
const uploadImg = require('../helpers/uploadImg');
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
     try {
     const { id: facebookId, name, email } = profile._json;
     // change avatar size
     const avatar = `https://graph.facebook.com/${facebookId}/picture?type=large`;
     
     const currentUser = await User.findOne({email});
     if(currentUser) {
       if(currentUser.avatar === 'images.png') {
         // update avatar of user using the social media link
         currentUser.avatar = await uploadImg(avatar, currentUser.id);
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
       user.avatar = await uploadImg(avatar, user.id);
       const newUser = await user.save();
       done(null, newUser);
     }
     }
     catch(err) {
       // log the error to db
       debug(err);
       return done(null, false);
     }
   })); // end FacebookStrategy
  
  passport.use(new GoogleStrategy({
    clientID: google.clientID, 
    clientSecret: google.clientSecret, 
    callbackURL: google.callbackURL,
     }, 
   async (accessToken, refreshToken, profile, done) => {
     try {
     const {sub: googleId, name, email, picture: avatar } = profile._json;
     
     const currentUser = await User.findOne({email});
     if(currentUser) {
       
       if(currentUser.avatar === 'images.png') {
         
         // update avatar of user using the social media link
    const imageName = await uploadImg(avatar, currentUser.id);
    
    currentUser.avatar = imageName;
    const updatedUser = await currentUser.save();
    
        return done(null, currentUser); 
       }
       else {
         return done(null, currentUser); 
       }
     }
     else {
       const user = new User({
         googleId, name, email, avatar
       });
       const imageName = await uploadImg(avatar, user.id);
       
       user.avatar = imageName;
       const newUser = await user.save(); 
       done(null, newUser);
     }
     }
     catch(err) {
       // log the error to db
       debug(err);
       return done(null, false);
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

