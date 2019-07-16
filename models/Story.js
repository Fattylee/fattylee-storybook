const mongoose = require('mongoose');
const { Schema } = mongoose;

const Story = mongoose.model('Story', new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}));

module.exports = Story;