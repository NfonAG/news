/**
 * Created by Vadym Yatsyuk on 23.08.17
 */

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./config');
const webpackConfig = require('./webpack/webpack.config.js');
const app = express();

mongoose.connect(config.mongodb.uri, config.mongodb.options);
mongoose.connection.on('error', (err) => {
  console.log(chalk.red(`MongoDB connection error: ${ err }`));
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./server/routes')(app);

function develop() {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(config.staticIndexFile));
    res.end();
  });
}

function prod() {
  app.use(express.static(config.staticDir));
  app.get('*', function response(req, res) {
    res.sendFile(config.staticIndexFile);
  });
}

if (config.isDeveloping) {
  develop();
} else {
  prod();
}

app.listen(config.port, () => {
  console.info(chalk.yellow(`Server is running on ${ config.port }`));
});