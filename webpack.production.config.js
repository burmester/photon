import webpack from 'webpack';
import path from 'path';
import webpackNodeExternals from 'webpack-node-externals';

const app = path.resolve(__dirname, 'src', 'app', 'app');
const server = path.resolve(__dirname, 'src', 'server', 'prod');

const appPath = path.resolve(__dirname, 'src', 'app');
const serverPath = path.resolve(__dirname, 'src', 'server');

export default {
  target: 'node',
  devtool: 'source-map',
  entry: {
    'public/build/bundle.js': app,
    'private/build/server.js': server
  },
  output: {
    path: './',
    filename: '[name]'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [appPath, serverPath]
      },
      {
        test: /\.css$/,
        loader: ['style', 'css?sourceMap']
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
      }
    ]
  },
  externals: [webpackNodeExternals()],
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    })
  ]
};
