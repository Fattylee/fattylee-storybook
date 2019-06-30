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
    const idea = { title, details, };
    res.render('ideas/add', {errors, idea});
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
    const idea = { title, details, _id: req.params.id };
    res.render('ideas/edit', {errors, idea});
  }
  else {
    next();
  }
}

exports.validateEditFields = validateEditFields;
exports.validateAddFields = validateAddFields;

