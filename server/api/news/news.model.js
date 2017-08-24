/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

const mongoose = require('bluebird').promisifyAll(require('mongoose'));

let NewsSchema = new mongoose.Schema({
  title: String,
  link: String,
  nickname: String,
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('News', NewsSchema);