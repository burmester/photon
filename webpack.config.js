import webpack from 'webpack';
import path from 'path';

const buildPath = path.resolve(__dirname, 'public', 'build');
const mainPath = path.resolve(__dirname, 'app', 'App.js');
const appPath = path.resolve(__dirname, 'app');

module.exports = {
  devtool: 'module-inline-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    // Switch between only-dev-server and dev-server. react-hot-loader enable with 'only'.
    'webpack/hot/dev-server',
    mainPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel-loader'],
        include: [appPath]
      }, {
        test: /\.css$/,
        loader: ['style', 'css']
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ]
};
