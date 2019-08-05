const router = require('express').Router();
const Story = require('../models/Story');
const Comment = require('../models/Comment');
const {validateAddFields, validateEditFields} = require('../middlewares/validateFields');
const debug = require('debug')('active:app');
const storyError = require('../controllers/errors/storyError');
const faker = require('faker');
const uuid = require('uuid');
const path = require('path');
const util = require('util');
const fse = require('fs-extra');
const fs = require('fs');

// catch all async errors related to stories route
//This will never get called!
router.all('/*', storyError);

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'main';
  next();
});

// add a new story form
router.get('/add', (req, res) => {
  res.render('stories/add', {pageTitle: 'Create story'});
});

// Create a new story action
router.post('/', validateAddFields, async (req, res, next) => {
 const {storyImage} = req.files;
 let fileName = `${new Date()}-${storyImage.name}`;
 
 const storagePath = path.join(__dirname, '../public/img/uploads/stories/');
 await util.promisify(storyImage.mv)(storagePath + fileName);
 
    const newStory = new Story({
      ...req.storyValue,
      status: req.body.status,
      allowComments: !!req.body.allowComments,
      storyImage: fileName,
      user: req.user._id,
    });
   // debug('newStory', newStory); return;
    const story = await newStory.save();
   // debug(story)
    req.flash('success_msg', `"${story.title}" was created successfully`);
    res.redirect('/stories');

});

// come back to this
// get all stories with associated user
router.get('/', async (req, res) => {

  const stories = await Story.find({user: req.user._id, })
  .sort('-updatedAt');
  
  res.render('stories', { stories, pageTitle: 'Stories',  });
});



// Read full story page
router.get('/:id', async (req, res) => {

  let story = await Story.findOne({_id: req.params.id })
  .populate('user')
  .populate({
    path: 'comments',
    populate: {
      path: 'owner', 
      select: 'name',
      model: 'User',
      }
  });
  //.sort({'comments': -1});
  //story.comments = 
  const obj = {
    ...story,
  }
 // obj.comments.sort((a,b) => b.createdAt - a.createdAt);
  
 //debug('full_story obj',JSON.stringify(obj, undefined, 2)); debug('full_story story',JSON.stringify(story, undefined, 2));
  //return;
  res.render('stories/full_story', { story, pageTitle: 'Full Story',  });
});

// Edit story page
router.get('/edit/:id', async (req, res) => {
  const story = await Story.findById(req.params.id); 
  res.render('stories/edit', {
    story, 
    pageTitle: 'Edit'}); 
}); 

// Edit a story action
router.put('/:id', validateEditFields, async (req, res) => {
  
  const story = await Story.findById(req.params.id);
  if(!story){
    req.flash('error_msg', 'story not found');
    return res.redirect('/stories');
  }
  if(story.user.toString() !== req.user._id.toString()) {
    req.flash('error_msg', 'Unauthorized, not your story');
  return res.redirect('/');
  }
  const {storyImage = undefined } = req.files || {};
  // get current fileName
  const prevFileName = story.storyImage;
  const storagePath = path.join(__dirname, '../public/img/uploads/stories/');
  if(storyImage) {
    if(storyImage.size > 2 * 1000 * 1000) {
    req.flash('error_msg', 'Image size cannot exceed 2mb');
    return res.redirect('/stories/edit/' + story._id);
  }
  if(!/^image\/.*$/i.test(storyImage.mimetype)) {
    req.flash('error_msg', 'file type not supported, pls use a valid image file (jpeg, png, jpg, gif etc)');
    return res.redirect('/stories/edit/' + story._id);
  }
    const fileName = `${new Date()}-${storyImage.name}`;
 // move cover image to public folder
 await util.promisify(storyImage.mv)(storagePath + fileName);
 story.storyImage = fileName;
 // cleanup prevFileName
 if(prevFileName !== 'story_placeholder.png') {
   await util.promisify(fs.unlink)(storagePath + prevFileName).catch(debug);
 }
  }
  story.title = req.body.title;
  story.details = req.body.details;
  story.status = req.body.status;
  story.allowComments = !!req.body.allowComments,
  await story.save(); 
  req.flash('success_msg', 'story was updated successfully');
  res.redirect('/stories');
});

// Delete a story
router.delete('/:id', async (req, res) => {
  const story = await Story.findByIdAndRemove(req.params.id);
  if(story) {
    const {storyImage} = story;
  
    await util.promisify(fs.unlink)(path.join(__dirname,'../public/img/uploads/stories', storyImage));
  } 
  req.flash('success_msg', 'story was deleted successfully');
  res.redirect('/stories');
});

// comments action
router.post('/comments/', async (req, res) => {
   debug('comments', req.body, 'params:', req.params.id,  );
  const story = await Story.findOne({_id: req.body.id});
  if(!story) {
    req.flash('error_msg', 'cannot find with the given ID');
    return res.redirect('/');
  }
  const newComment = new Comment({
    owner: req.user.id,
    body: req.body.body,
  });
  // save comment to comment collection
  const { _id } = await newComment.save();
  if(!_id) {
    req.flash('error_msg', 'cannot create a comment, pls try again');
    return res.redirect('/stories/' + req.body.id);
  }
  
  story.comments = [...story.comments, _id ];
  // save comment id to story collection
  const updatedComment = await story.save();
  req.flash('success_msg', 'comment posted successfully!')
  res.redirect('/stories/' + req.body.id);
}); // end comments action

// toggle user status
router.patch('/:id/:status', async (req, res) => {
  const updatedStory = await  Story.findByIdAndUpdate(req.params.id, {status: req.params.status === 'public' ? 'private': 'public'}, {new: true}); 
  res.redirect('/stories');
}); // end toggle user status


// fake story generator
router.post('/faker', (req, res) => {
  debug('faker', faker, faker.name);
  
  const amount = req.body.amount;
  res.send(amount);
});// end fake story generator

/*router.all('/*', (req, res, next) => {
  res.send('404 not found, Stories');
});*/

module.exports = router;