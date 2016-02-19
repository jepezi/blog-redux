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

var cssloaders = [
  { test: /\.module.s?css$/, loader:  'style!css?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&' + "includePaths[]=" + encodeURIComponent(path.resolve(__dirname, "../src/")) },
  { test: /^((?!\.module).)*css$/, loader: 'style!css!postcss!sass?outputStyle=expanded&sourceMap&' + "includePaths[]=" + encodeURIComponent(path.resolve(__dirname, "../src/")) },
];

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
    loaders: [jsloader].concat(cssloaders)
  },
  plugins: [ // (4)
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  postcss: function(webpack) {
    return [
      require('autoprefixer')({ browsers: ['last 2 versions'] }),
    ]
  },
};
