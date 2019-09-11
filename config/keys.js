if(process.env.NODE_ENV === 'production') {
  require('dotenv').config(); 
  module.exports = require('./prod');
}
else if (process.env.NODE_ENV === 'staging') { 
  require('dotenv').config({path: '.env.stag'}); 
  module.exports = require('./stag');
}
else {
  module.exports = require('./dev');
}
