/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

const mongoose = require('bluebird').promisifyAll(require('mongoose'));

let CommentSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  news: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);