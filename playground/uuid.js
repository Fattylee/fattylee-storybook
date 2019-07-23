const uuidv3 = require('uuid/v3');
const uuid = require('uuid');


console.log('DNS', uuidv3('dns',uuidv3.DNS));
console.log('URL', uuidv3.URL);
console.log('uuid', typeof uuid());
console.log('=====')