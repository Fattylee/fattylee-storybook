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
  googleCloudStorage: {
    GOOGLE_PROJECT_ID: process.env.GOOGLE_PROJECT_ID,
    GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY
  },
}