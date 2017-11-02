const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
};

module.exports = function (options) {
  return webpackMerge(commonConfig({ env: ENV }), {

    devtool: 'source-map',

    output: {
      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: path.resolve(__dirname, 'dist'),

      publicPath: '',

      /**
       * Specifies the name of each output file on disk.
       * IMPORTANT: You must not specify an absolute path here!
       *
       * See: http://webpack.github.io/docs/configuration.html#output-filename
       */
      filename: '[name].[chunkhash].bundle.js',

      /**
       * The filename of the SourceMaps for the JavaScript files.
       * They are inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
       */
      sourceMapFilename: '[file].map',

      /**
       * The filename of non-entry chunks as relative path
       * inside the output.path directory.
       *
       * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
       */
      chunkFilename: '[name].[chunkhash].chunk.js'
    },

    module: {
      rules: [
        /**
         * Extract CSS files from .src/styles directory to external CSS file
         */
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
          include: [ helpers.root('src', 'styles') ]
        },

        /**
         * Extract and compile SCSS files from .src/styles directory to external CSS file
         */
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader', 'sass-loader' ]
          }),
          include: [ helpers.root('src', 'styles') ]
        }
      ]
    },

    plugins: [

      /**
       * Plugin: ExtractTextPlugin
       * Description: Extracts imported CSS files into external stylesheet
       *
       * See: https://github.com/webpack/extract-text-webpack-plugin
       */
      new ExtractTextPlugin('[name].[contenthash].css'),

      /**
       * Plugin: UglifyJsPlugin
       * Description: Minimize all JavaScript output of chunks.
       * Loaders are switched into minimizing mode.
       *
       * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
       *
       * NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
       */
      new UglifyJsPlugin({
        parallel: true,
        uglifyOptions: {
          ie8: false,
          ecma: 6,
          warnings: true,
          mangle: true, // debug false
          output: {
            comments: false,
            beautify: false, // debug true
          }
        }
      }),
    ],

  });
}
