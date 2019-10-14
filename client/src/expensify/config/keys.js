import devKeys from './dev';
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
  keys = devKeys;
}


export default keys;

