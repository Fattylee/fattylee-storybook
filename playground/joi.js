const Joi = require('joi');


let schema = Joi
  .number()
  //.integer()
  .positive()
  //.multiple(5)
  //.less(4)
  .greater(7)
  .options({abortEarly: false})
  .label('Number')
  //.unsafe() // allow any kind of number that is outside js contruct safe is enabled by default
  .precision(2) // round to 2dp


schema = Joi.object({ 
  min: Joi.number(),
  max: Joi.number().greater(Joi.ref('min')).required(),
  myFunc: Joi.func().required(),
  today: Joi.date().required().max('now').timestamp(),
  yesterday: Joi.date().less(Joi.ref('today')).required(),
  })
  .options({abortEarly: false, allowUnknown: true});
 
 
 
 // method one to call validate method
/*const {error, value } = schema.validate({
  max: 45,
  min: 44,
  myFunc: () => {},
  today: new Date('2099-2-23'), //'2017-2-23'
  yesterday: '3077-8-23'
});*/

 // method two to call validate method
//const {error, value } = Joi.validate(56, schema);

// method three to call validate method
//const {error, value } = Joi.number().required().integer().negative().greater(55).options({abortEarly: false}).precision(2).label('age').multiple(2).validate(45.789);

schema = Joi.object().keys({
  lowercase: Joi.string().regex(/[a-z]{1,}/),
  uppercase: Joi.string().regex(/[A-Z]{1,}/).error(errors => { return { message: "Coins is required." }; }),
  number: Joi.string().regex(/[\d]{1,}/),
  symbol: Joi.string().regex(/[-_.@%]{1,}/),
  size: Joi.string().length(6)
});
const password = 'veyw62h';
const {error, value } = schema.validate({
  lowercase: password,
  uppercase: password,
  number: password,
  symbol: password,
  size: password,
});
let errors = error || {details: [{message: null}]};
errors = errors.details.map(e => ({error :e.message}))

console.log('error', JSON.stringify(errors, null, 2), 'value', value);