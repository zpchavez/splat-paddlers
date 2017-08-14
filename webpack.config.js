var Webpack = require('webpack');
var WebpackError = require('webpack-error-notification');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ClosureCompilerPlugin = require('webpack-closure-compiler');
var path = require('path');

var assetsPath = path.resolve(__dirname, 'assets');
var libPath = path.resolve(__dirname, 'lib');
var npmPath = path.resolve(__dirname, 'node_modules');
var appFolder = './src';
var buildPath = path.resolve(__dirname, 'build');
var environment = (process.env.APP_ENV || 'development');
var __HOSTNAME__ = 'localhost';
var __PORT__ = 9123;

var appEntries = [
    appFolder + '/main.js',
];

var config = {
  devtools: [],
  entries: {
    app: appEntries
  },
  plugins: [
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: appFolder + '/index.html',
      inject: false
    }),
  ],
};

config.devtools = '#inline-source-map';

if (environment === 'development') {
  config.plugins.push(
    new Webpack.NoErrorsPlugin(),
    new WebpackError(process.platform)
  );
} else if (environment === 'production') {
  config.plugins.push(
    new ClosureCompilerPlugin({
      jsCompiler: true,
      compiler: {
        compilation_level: 'SIMPLE',
        language_in: 'ECMASCRIPT5'
      }
    })
  );
}


var phaserFilename = (environment === 'development') ? 'phaser.js' : 'phaser.min.js';
config.plugins.push(
    new CopyWebpackPlugin([
        {
            from: assetsPath,
            to: buildPath + '/assets',
        }
    ])
)

module.exports = [
  {
    name: 'app bundle',
    entry: config.entries.app,
    output: {
      filename: 'app.js',
      path: buildPath,
      publicPath: '/',
    },
    module: {
      loaders: [
        {
          test: /\.(eot|ico|ttf|woff|woff2|gif|jpe?g|png|svg)$/,
          loader: 'file-loader',
          exclude: npmPath,
        },
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          exclude: npmPath,
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: npmPath,
        },
      ],
    },
    plugins: config.plugins,

    resolve: {
      alias: {
        base: path.resolve('./'),
      },
      extensions: ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js'],
    },
    devtool: config.devtools,
  },
];
