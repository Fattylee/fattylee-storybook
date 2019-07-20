const debug = require('debug')('active:app');
const Joi = require('joi');

const config = Joi.object().options({abortEarly: false, allowUnknown: true});

const loginSchema = config.keys({
    email: Joi.string().min(5).email({minDomainAtoms: 2}).required().label('Email').trim(),
    password: Joi.string().min(5).required().label('Password').trim(), 
  });

const registerSchema = loginSchema.keys({
  name: Joi.string().min(5).required().label('Name').trim(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm password').options({ language: { any: { allowOnly: 'must match Password' } } }).trim(),
 
})

const storySchema = config.keys({
    title: Joi.string().min(5).required().label('Title').trim(),
    details: Joi.string().min(10).required().label('Details').trim(), 
  });

const validateAddFields = async (req, res, next) => {
  const { error, value } = Joi.validate(req.body, storySchema);
  const story = value;
  if(error) {
    const errors = error.details.map(e => ({error: e.message}));
    res.render('stories/add', {errors, story, pageTitle: 'Create story'});
  }
  else {
    req.storyValue = story;
    next();
  }
};

const validateEditFields = async (req, res, next) => {
  const { error, value } = Joi.validate(req.body, storySchema);
  const story = {...value, _id: req.params.id};
  if(error) {
    const errors = error.details.map(e => ({error: e.message}));
    res.render('stories/edit', {errors, story, pageTitle: 'Edit'});
  }
  else {
    next();
  }
}

const validateLoginFields = async (req, res, next) => {
  const { error, value } = Joi.validate(req.body, loginSchema);
  if(error) {
    const errors = error.details.map(e => ({error: e.message}));
    res.render('users/login', {errors, user: value, pageTitle: 'Login'});
  }
  else {
    next();
  }
}

const validateRegisterFields = async (req, res, next) => {
  const { error, value } = Joi.validate(req.body, registerSchema);
  if(error) {
    const errors = error.details.map(e => ({error: e.message}));
    res.render('users/register', {errors, userValue: value, pageTitle: 'Register'});
  }
  else {
    req.userValue = value;
    next();
  }
}

exports.validateEditFields = validateEditFields;
exports.validateAddFields = validateAddFields;
exports.validateLoginFields = validateLoginFields;
exports.validateRegisterFields = validateRegisterFields;