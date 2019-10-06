const router = require('express').Router();
const Story = require('../../../models/Story');
const Comment = require('../../../models/Comment');
const {validateAddFields, validateEditFields, } = require('../../../middlewares/validateFields');
const debug = require('debug')('active:app');
const storyError = require('../../../controllers/errors/storyError');
const faker = require('faker');
const uuid = require('uuid/v1');
const path = require('path');
const util = require('util');
const fse = require('fs-extra');
const fs = require('fs');
const storage = require('../../../helpers/googleCloudService');

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
  
    const newStory = new Story({
      ...req.storyValue,
      status: req.body.status,
      allowComments: !!req.body.allowComments,
      storyImage: req.body.storyImage,
      user: req.user._id,
    });
   
    const story = await newStory.save();
    
    req.flash('success_msg', `"${story.title}" was created successfully`);
    res.redirect('/stories');

});

// come back to this
// get all stories with associated user
router.get('/', async (req, res) => {

  const stories = await Story.find()
  .populate('user')
  .populate({
    path: 'comments',
    populate: {
      path: 'owner', 
      //select: 'name',
      model: 'User',
      }
  })  
  //.populate('comments')
  .sort('-updatedAt');
  
  res.status(200).send(stories);
  //'stories', { stories, pageTitle: 'Stories',  });
});



// Read full story page
router.get('/:slug', async (req, res) => {

  let story = await Story.findOne({slug: req.params.slug })
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
  
  res.render('stories/full_story', { story, pageTitle: 'Full Story',  });
});

// Edit story page
router.get('/edit/:slug', async (req, res) => {
  const story = await Story.findOne({slug: req.params.slug}); 
  res.render('stories/edit', {
    story, 
    pageTitle: 'Edit'}); 
}); 

// Edit a story action
router.put('/:id', validateEditFields, async (req, res) => {
  const story = await Story.findById(req.params.id);
  if(!story){
    req.flash('error_msg', 'story not$ found');
    return res.redirect('/stories');
  }
  if(story.user.toString() !== req.user._id.toString()) {
    req.flash('error_msg', 'Unauthorized, not your story');
  return res.redirect('/');
  }
  
  const prevFileName = story.storyImage;
 // cleanup prevFileName
 if(req.body.storyImage) {
   storage
    .bucket('storybook_uploads')
    .file(prevFileName)
    .delete();
 }
  
  story.storyImage = req.body.storyImage || prevFileName;
  story.title = req.body.title;
  story.details = req.body.details;
  story.status = req.body.status;
  story.allowComments = !!req.body.allowComments,
  await story.save(); 
  req.flash('success_msg', 'story was updated successfully');
  res.redirect('/stories');
});

// Delete a story and related comments
router.delete('/:id', async (req, res) => {
 
    const story = await Story.findById(req.params.id);
    
  if(!story) {
     req.flash('error_msg', 'story was not found, please try again');
  return res.redirect('/stories');
  }
  const {storyImage} = story;
  
  const forceDelete = async () => {
    if(story.comments.length) {
      const allComments = story.comments.map(id => Comment.findByIdAndRemove(id));
      const deletedComments = await Promise.all(allComments);
      
    }
    return story.remove();
  };
  
  try {
  await storage
    .bucket('storybook_uploads')
    .file(storyImage)
    .delete();
  
  await forceDelete();
  
  req.flash('success_msg', 'story was deleted successfully');
  res.redirect('/stories');
  }
  catch(err) {
    debug('delete error:', typeof err.code);
    if(err.code == '404') {
      await forceDelete();
  
  req.flash('success_msg', 'story was deleted successfully');
  return res.redirect('/stories');
    }
    req.flash('error_msg', 'Delete story failed, please try again later');
    return res.redirect('/stories');
  }
});// end Delete a story and related comments


// comments action
router.post('/:id/comments/',
async (req, res) => {
   
   const story = await Story.findOne({_id: req.params.id })
  .populate('user')
  .populate({
    path: 'comments',
    populate: {
      path: 'owner', 
      select: 'name',
      model: 'User',
      }
  });
  
  if(!story) {
    req.flash('error_msg', 'cannot find comment with the given ID');
    return res.redirect('/');
  }
  if(!req.body.body.trim()){
    
    const errors = [{error: 'Comment body cannot be empty'}]
    return res.render('stories/full_story', { story, pageTitle: 'Full Story', errors,  });
  }
 
  const newComment = new Comment({
    owner: req.user.id,
    body: req.body.body,
  });
  // save comment to comment collection
  const { _id } = await newComment.save();
  if(!_id) {
    req.flash('error_msg', 'cannot create a comment, pls try again');
    return res.redirect('/stories/' + story.slug);
  }
  
  story.comments = [...story.comments, _id ];
  // save comment id to story collection
  const updatedComment = await story.save();
  req.flash('success_msg', 'comment posted successfully!')
  res.redirect('/stories/' + story.slug);
}); // end comments action

// toggle user status
router.patch('/:id/:status', async (req, res) => {
  const updatedStory = await  Story.findByIdAndUpdate(req.params.id, {status: req.params.status === 'public' ? 'private': 'public'}, {new: true}); 
  res.redirect('/stories');
}); // end toggle user status


// fake story generator
router.post('/faker', (req, res) => {
 // debug('faker', faker, faker.name);
  
  const amount = req.body.amount;
  res.send(amount);
});// end fake story generator

/*router.all('/*', (req, res, next) => {
  res.send('404 not found, Stories');
});*/

module.exports = router;