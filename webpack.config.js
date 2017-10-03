var Webpack = require('webpack');
var WebpackError = require('webpack-error-notification');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ClosureCompilerPlugin = require('webpack-closure-compiler');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var path = require('path');

var assetsPath = path.resolve(__dirname, 'assets');
var libPath = path.resolve(__dirname, 'lib');
var npmPath = path.resolve(__dirname, 'node_modules');
var appFolder = './src';
var buildPath = path.resolve(__dirname, 'build');
var environment = (process.env.APP_ENV || 'development');
var __HOSTNAME__ = 'localhost';
var __PORT__ = 9123;

var config = {
  devtools: [],
  plugins: [
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: appFolder + '/screen.html',
      filename: "screen.html",
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: appFolder + '/controller.html',
      filename: "controller.html",
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
  if (process.env.MINIFIER === 'uglify') {
    config.plugins.push(
      new UglifyJSPlugin()
    );
  } else if (process.env.MINIFIER === 'closure') {
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
}


var phaserFilename = (environment === 'development') ? 'phaser.js' : 'phaser.min.js';

const moduleOptions = {
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
};

const resolveOptions = {
  alias: {
    base: path.resolve('./'),
  },
  extensions: ['', '.css', '.js', '.json', '.jsx', '.scss', '.webpack.js', '.web.js'],
};

module.exports = [
  {
    name: 'screen bundle',
    entry: appFolder + '/screen.js',
    output: {
      filename: 'screen.js',
      path: buildPath,
      publicPath: '/',
    },
    module: moduleOptions,
    plugins: config.plugins,
    resolve: resolveOptions,
    devtool: config.devtools,
  },
  {
    name: 'controller bundle',
    entry: appFolder + '/controller.js',
    output: {
      filename: 'controller.js',
      path: buildPath,
      publicPath: '/',
    },
    module: moduleOptions,
    plugins: config.plugins,
    resolve: resolveOptions,
    devtool: config.devtools,
  },
];
