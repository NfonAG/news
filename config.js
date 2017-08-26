/**
 * Created by Vadym Yatsyuk on 23.08.17
 */
const path = require('path');

const isDeveloping = process.env.NODE_ENV !== 'production';
const staticDir = path.join(__dirname, 'static');

module.exports = {
  rootSource: path.join(__dirname, 'app'),
  staticDir,
  staticIndexFile: path.join(staticDir, 'index.html'),
  port: process.env.PORT || 8000,
  isDeveloping,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/news-dev',
    options: {
      useMongoClient: true
    }
  }
};