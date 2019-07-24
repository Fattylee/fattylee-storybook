const router = require('express').Router();
const Story = require('../models/Story');
const {validateAddFields, validateEditFields} = require('../middlewares/validateFields');
const debug = require('debug')('active:app');
const storyError = require('../controllers/errors/storyError');
const faker = require('faker');
const uuid = require('uuid');
const path = require('path');


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
 let fileName = `${uuid()}-${storyImage.name}`;
 //const prevFileName = 
 const storagePath = path.join(__dirname, '../public/img/uploads/stories/');
 storyImage.mv(storagePath + fileName, async err => {
   if(err) throw err;
   
   // const filePath = storagePath
 //debug(storyImage, storagePath); return;
 
 //check for mimetype (image/*) and size 2*1000000 bytes 2m
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
 })

});

// come back to this
// get all stories with associated user
router.get('/', async (req, res) => {

  const stories = await Story.find({user: req.user._id, })
  .sort('-updatedAt');
  
  debug('stories', stories);
  res.render('stories', { stories, pageTitle: 'Stories',  });
});



// Read full story page
router.get('/:id', async (req, res) => {

  const story = await Story.findOne({_id: req.params.id }).populate('user');
  
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
  
  story.title = req.body.title;
  story.details = req.body.details;
  story.status = req.body.status;
  await story.save(); 
  req.flash('success_msg', 'story was updated successfully');
  res.redirect('/stories');
});

// Delete a story
router.delete('/:id', async (req, res) => {
  const story = await Story.findByIdAndRemove(req.params.id);
  if(!story) return res.redirect('/stories');
  req.flash('success_msg', 'story was deleted successfully');
  res.redirect('/stories');
});

// fake story generator
router.post('/faker', (req, res) => {
  debug('faker', faker, faker.name);
  
  const amount = req.body.amount;
  res.send(amount);
})

router.all('/*', (req, res, next) => {
  res.send('404 not found, Stories');
});

module.exports = router;
