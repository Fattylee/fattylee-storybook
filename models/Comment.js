const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);