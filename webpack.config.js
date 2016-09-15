var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');
var appPath = path.resolve(__dirname, "app")

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'babel-polyfill',
    // Switch between only-dev-server and dev-server. react-hot-loader enable with "only".
     'webpack/hot/dev-server',
    // 'webpack/hot/only-dev-server',
    mainPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['babel-loader'],
      include: [appPath]
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }]
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()]
};
