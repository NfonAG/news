/**
 * Created by Vadym Yatsyuk on 24.08.17
 */

module.exports = function (app) {
  app.use('/api/news', require('./api/news'));
  app.use('/api/comments', require('./api/news'));
};