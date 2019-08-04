module.exports = {
  MONGODB_URI: process.env.SB_MONGODB_URI,
  facebook: {
    clientID: process.env.facebook_clientID,
    clientSecret: process.env.facebook_clientSecret,
    callbackURL: process.env.facebook_callbackURL,
  },
  google: {
    clientID: process.env.google_clientID,
    clientSecret: process.env.google_clientSecret,
    callbackURL: process.env.google_callbackURL,
  },
}

