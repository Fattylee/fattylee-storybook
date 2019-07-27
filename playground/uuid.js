import exp from 'express';
import morgan from 'morgan';

const app = exp();
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('<h1>Hi guys</h1>');
})

app.listen(3000, console.log('server on 3000'))


const uuidv3 = require('uuid/v3');
const uuid = require('uuid');


console.log('DNS', uuidv3('dns',uuidv3.DNS));
console.log('URL', uuidv3.URL);
console.log('uuid', typeof uuid());
console.log('=====')