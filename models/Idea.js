const mongoose = require('mongoose');
const { Schema } = mongoose;

const Idea = mongoose.model('idea', new Schema({
  title: String,
  details: String,
  date: {
    type: Date,
    default: Date.now,
  },
}));

module.exports = Idea;
