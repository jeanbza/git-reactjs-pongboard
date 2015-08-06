// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

const path = require('path');

module.exports = {
  // the project dir
  context: __dirname,
  entry: ['./assets/javascripts/App'],
  resolve: {
    root: [path.join(__dirname, 'scripts'), path.join(__dirname, 'assets/javascripts')],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.css', 'config.js']
  },
  module: {
    loaders: [],
  },
};
