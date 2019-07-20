const router = require('express').Router();
const Story = require('../models/Story');
const {validateAddFields, validateEditFields} = require('../middlewares/validateFields');
const debug = require('debug')('active:app');
const storyError = require('../controllers/errors/storyError');



// catch all async errors related to stories route
//This will never get called!
router.all('/*', storyError);

router.all('/*', (req, res, next) => {
  req.app.locals.layout = 'main';
  next();
});
// Create a new story
router.post('/', validateAddFields, async (req, res, next) => {
  
    const newStory = new Story({
      ...req.storyValue,
      status: req.body.status,
      user: req.user._id,
    });
    const story = await newStory.save();
    
    req.flash('success_msg', `"${story.title}" was created successfully`);
    res.redirect('/stories');
});

// come back to this
// get all stories with associated user
router.get('/', async (req, res) => {

  const stories = await Story.find({user: req.user._id, })
  .sort('-updatedAt');
  
  debug('stories', stories);
  res.render('stories', { stories, pageTitle: 'Stories',  });
});

router.get('/add', (req, res) => {
  res.render('stories/add', {pageTitle: 'Create story'});
});

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
  
  story.title = req.body.title;
  story.details = req.body.details;
  story.status = req.body.status;
  await story.save();
  req.flash('success_msg', 'story was updated successfully');
  res.redirect('/stories');
});

router.delete('/:id', async (req, res) => {
  const story = await Story.findByIdAndRemove(req.params.id);
  if(!story) return res.redirect('/stories');
  req.flash('success_msg', 'story was deleted successfully');
  res.redirect('/stories');
});

router.get('/edit/:id', async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.render('stories/edit', {story, pageTitle: 'Edit'}); 
}); 

router.all('/*', (req, res, next) => {
  res.send('404 not found, Stories');
});

module.exports = router;