const validateAddFields = async (req, res, next) => {
  let errors = [];
  const title = req.body.title.trim();
    const details = req.body.details.trim();
  if(!title){
    errors.push({error: 'pls enter some text in the title field'})
  }
  else if(title.length < 5){
    errors.push({error: 'title min. length character is 5'});
  }
  if(!details){
    errors.push({error: 'pls enter some text in the details field'})
  }
  else if(details.length < 10){
    errors.push({error: 'details min. length character is 10'});
  }
  if(errors.length > 0){
    const story = { title, details, };
    res.render('stories/add', {errors, story});
  }
  else {
    next();
  }
};

const validateEditFields = async (req, res, next) => {
  let errors = [];
  const title = req.body.title.trim();
    const details = req.body.details.trim();
  if(!title){
    errors.push({error: 'pls enter some text in the title field'})
  }
  else if(title.length < 5){
    errors.push({error: 'title min. length character is 5'});
  }
  if(!details){
    errors.push({error: 'pls enter some text in the details field'})
  }
  else if(details.length < 10){
    errors.push({error: 'details min. length character is 10'});
  }
  if(errors.length > 0){
    const story  = { title, details, _id: req.params.id };
    res.render('stories/edit', {errors, story});
  }
  else {
    next();
  }
}

const validateLoginFields = async (req, res, next) => {
  let errors = [];
  const email = req.body.email.trim();
    const password = req.body.password.trim();
  if(!email){
    errors.push({error: 'pls enter some text in the email field'})
  }
  else if(email.length < 5){
    errors.push({error: 'email min. length character is 5'});
  }
  if(!password){
    errors.push({error: 'pls enter some text in the password field'})
  }
  else if(password.length < 5){
    errors.push({error: 'password min. length character is 5'});
  }
  if(errors.length > 0){
    const user  = { email, password };
    res.render('users/login', {errors, user});
  }
  else {
    next();
  }
}

const validateRegisterFields = async (req, res, next) => {
  let errors = [];
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();
  const confirmPassword = req.body.confirmPassword.trim();
  if(!name){
    errors.push({error: 'pls enter some text in the name field'})
  }
  else if(name.length < 5){
    errors.push({error: 'name min. length character is 5'});
  }
  if(!email){
    errors.push({error: 'pls enter some text in the email field'})
  }
  else if(email.length < 5){
    errors.push({error: 'email min. length character is 5'});
  }
  if(!password){
    errors.push({error: 'pls enter some text in the password field'})
  }
  else if(password.length < 5){
    errors.push({error: 'password min. length character is 5'});
  }
  if(!confirmPassword){
    errors.push({error: 'pls enter some text in the confirm password field'})
  }
  else if(confirmPassword !== password){
    errors.push({error: 'password and confirm password does not match'});
  }
  if(errors.length > 0){
    const user  = { name, email, password, confirmPassword };
    res.render('users/register', {errors, user});
  }
  else {
    next();
  }
}

exports.validateEditFields = validateEditFields;
exports.validateAddFields = validateAddFields;
exports.validateLoginFields = validateLoginFields;
exports.validateRegisterFields = validateRegisterFields;
