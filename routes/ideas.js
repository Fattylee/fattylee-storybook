const express = require('express');
const router = express.Router();
const Idea = require('../models/Idea');
const {validateAddFields, validateEditFields} = require('../middlewares/validateFields');

router.post('/ideas', validateAddFields, async (req, res) => {
  
    const newIdea = new Idea({
      title: req.body.title,
      details: req.body.details,
    });
    await newIdea.save();
    res.redirect('/ideas');
});

router.get('/', async (req, res) => {
  const ideas = await Idea.find().sort('-date');
  res.render('ideas', { ideas, });
});

router.get('/add', (req, res) => {
  res.render('ideas/add');
});

router.put('/:id', validateEditFields, async (req, res) => {
  
  const idea = await Idea.findById(req.params.id);
  if(!idea) return res.redirect('/ideas');
  
  idea.title = req.body.title;
  idea.details = req.body.details;
  await idea.save();
  res.redirect('/ideas');
});

router.delete('/:id', async (req, res) => {
  const idea = await Idea.findByIdAndRemove(req.params.id);
  if(!idea) return res.redirect('/ideas');
  
  res.redirect('/ideas');
});

router.get('/edit/:id', async (req, res) => {
  const idea = await Idea.findById(req.params.id);
  res.render('ideas/edit', {idea}); 
});

module.exports = router;

