var path = require('path');

var APPPATH = path.resolve(__dirname, '..');

var jsloader = {
  test: /.js$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    presets: ['es2015', 'react'],
  }
}

// export webpack config object.
module.exports = {
  entry: path.join(APPPATH, 'src/main.js'),
  output: {
    path: path.join(APPPATH, 'public', 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [jsloader]
  }
};
