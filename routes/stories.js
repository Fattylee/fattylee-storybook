const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const {validateAddFields, validateEditFields} = require('../middlewares/validateFields');

router.post('/', validateAddFields, async (req, res) => {
  
    const newStory = new Story({
      title: req.body.title,
      details: req.body.details,
    });
    await newStory.save();
    req.flash('success_msg', 'story was published successfully');
    res.redirect('/stories');
});

router.get('/', async (req, res) => {
  const stories = await Story.find().sort('-date');
  res.render('stories', { stories, });
});

router.get('/add', (req, res) => {
  res.render('stories/add');
});

router.put('/:id', validateEditFields, async (req, res) => {
  
  const story = await Story.findById(req.params.id);
  if(!story){
    req.flash('error_msg', 'story not found');
    return res.redirect('/stories');
  }
  
  story.title = req.body.title;
  story.details = req.body.details;
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
  res.render('stories/edit', {story}); 
});

module.exports = router;