var path = require('path');
var webpack = require('webpack'); // (5)
var APPPATH = path.resolve(__dirname, '..');

var jsloader = {
  test: /.js$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    presets: ['es2015', 'react', 'stage-2'],
    plugins: ['add-module-exports'],
    env: { // (3)
      development: {
        presets: ['react-hmre']
      }
    }
  }
}

// export webpack config object.
module.exports = {
  entry: {
    main: [ // (1)
      'webpack-hot-middleware/client',
      path.join(APPPATH, 'src/client/main.js')
    ],
    admin: [
      'webpack-hot-middleware/client',
      path.join(APPPATH, 'src/admin/main.js')
    ]
  },
  output: {
    path: path.join(APPPATH, 'public', 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/dist/' // (2)
  },
  module: {
    loaders: [jsloader]
  },
  plugins: [ // (4)
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
