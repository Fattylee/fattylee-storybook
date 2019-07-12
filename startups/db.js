const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;


const startDB = async () => {
  try {
    const mongdbUri = keys.MONGODB_URI;
    console.log('mongdbUri', mongdbUri);
    await mongoose.connect(mongdbUri);
    console.log('connected to mongodb(expert)');
  }
  catch(ex) {
    console.error('Could not connect to mongodb', ex.message);
  }
};

module.exports = startDB;