import prodKeys from './prod';
import testDbKeys from './test_db';

let keys;

if(process.env.NODE_ENV  === 'production') {
  keys = prodKeys;
}
else if(process.env.NODE_ENV  === 'test') {
  
  keys = testDbKeys;
}
else { 
  keys = require('./dev');
}


export default keys;

