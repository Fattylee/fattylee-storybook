const mongoose = require('mongoose');
const { Schema } = mongoose;

const Story = mongoose.model('story', new Schema({
  title: String,
  details: String,
  date: {
    type: Date,
    default: Date.now,
  },
}));

module.exports = Story;