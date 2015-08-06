// Run like this:
// cd client && $(npm bin)/webpack -w --config webpack.rails.config.js
// NOTE: All style sheets handled by the asset pipeline in rails

const config = require('./webpack.common.config');

config.output = {
  filename: 'client-bundle.js',
  path: '../app/assets/javascripts/generated'
};

// load jQuery from cdn or rails asset pipeline
config.externals = {jquery: 'var jQuery'};

// You can add entry points specific to rails here
config.entry.push('./scripts/rails_only');

config.module.loaders.push(
  {test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
  {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},

  // Next 2 lines expose jQuery and $ to any JavaScript files loaded after client-bundle.js
  // in the Rails Asset Pipeline. Thus, load this one prior.
  {test: require.resolve('jquery'), loader: 'expose?jQuery'},
  {test: require.resolve('jquery'), loader: 'expose?$'}
);
module.exports = config;
