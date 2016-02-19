require('babel-polyfill');
require('babel-register')({
  presets: ['es2015', 'react', 'stage-2'],
  plugins: ['add-module-exports'],
});

const path = require('path');
const express = require('express');
// Login
const bodyParser = require('body-parser');
const session = require('express-session');
//
const webpack = require('webpack');
const devPort = 3001;

const webpackConfig = require('../webpack/hot.config');
const compiler = webpack(webpackConfig);

const serverOptions = {
  noInfo: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  // watchOptions: { aggregateTimeout: 2000, poll: 1000 },
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

const app = express();

// Login
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'shuuuuu',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000*60 }
}));

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));
app.use(express.static('public'));

app.use('/admin', require('./admin.js'));
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});


app.listen(devPort, function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', devPort);
  }
});
