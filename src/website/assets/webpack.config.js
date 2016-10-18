var path = require('path');
var BUILD_DIR = path.resolve(__dirname, '../dist');
var APP_DIR = path.resolve(__dirname, 'src');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src'),
        ],
        test: /\.jsx?$/,
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      },
    ]
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, './stylesheets')]
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ]
};

module.exports = config;