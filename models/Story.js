const mongoose = require('mongoose');
const { Schema } = mongoose;
const URLSlugs = require('mongoose-url-slugs');

const StorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    minlength: 5,
  },
  details: {
    type: String,
    required: true,
    trim: true,
    minlength: 100,
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
  allowComments: {
    type: Boolean,
    default: true,
  },
  storyImage: {
    type: String,
    default: 'story_placeholder.png',
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
  }],
}, { timestamps: true });

// slug field
StorySchema.plugin(URLSlugs('title'));

const Story = mongoose.model('Story', StorySchema);

module.exports = Story;

