const {Storage} = require('@google-cloud/storage');
const {googleCloudStorage: {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_PROJECT_ID,
}} = require('../config/keys');

const storage = new Storage({
    credentials: {
      client_email: GOOGLE_CLIENT_EMAIL,
      private_key: GOOGLE_PRIVATE_KEY,
    },
    projectId: GOOGLE_PROJECT_ID,
});


module.exports = storage;

