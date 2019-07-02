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
  if(!story) return res.redirect('/stories');
  
  story.title = req.body.title;
  story.details = req.body.details;
  await story.save();
  res.redirect('/stories');
});

router.delete('/:id', async (req, res) => {
  const story = await Story.findByIdAndRemove(req.params.id);
  if(!story) return res.redirect('/stories');
  
  res.redirect('/stories');
});

router.get('/edit/:id', async (req, res) => {
  const story = await Story.findById(req.params.id);
  res.render('stories/edit', {story}); 
});

module.exports = router;
