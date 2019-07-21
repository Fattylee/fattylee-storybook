const mongoose = require('mongoose');
const keys = require('../config/keys');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;


const startDB = async (app) => {
  try {
    const mongdbUri = keys.MONGODB_URI;
    console.log('mongdbUri', mongdbUri);
    await mongoose.connect(mongdbUri);
    console.log('connected to mongodb(expert)');
    const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server running on port', port));
  }
  catch(ex) {
    console.error('Could not connect to mongodb:', ex);
    //process.exit(1)
  }
};

module.exports = startDB;