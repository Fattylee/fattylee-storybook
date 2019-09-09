const fs = require('fs');
console.log(fs);
require('dotenv').config({path: '.test'});
console.log(typeof process.env.test_MAKE_ME_LAUGH)
//process.env.npm_config_json = 4678899;
console.log('cross_env', process.env);
console.log('people of the past')