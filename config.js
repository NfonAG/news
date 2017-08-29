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
  },
  oneSignal: {
    app_id: process.env.ONESIGNAL_APP_ID || '43a0de9d-5adb-438e-b780-46756a50ec3f',
    token: process.env.ONESIGNAL_TOKEN || 'ZmRmMTY4MTQtYWYyMy00NmQwLWE3YTUtMDU1ZjQ2Y2FmNzZk'
  }
};