const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const path = require('path');

/*
 * Webpack Plugins
 */
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/*
 * Webpack constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = process.argv.join('').indexOf('hot') > -1;
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const PUBLIC = process.env.PUBLIC_DEV || HOST + ':' + PORT;
const METADATA = {
  host: HOST,
  port: PORT,
  public: PUBLIC,
  ENV: ENV,
  HMR: HMR
};

module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {

    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-source-map',

    output: {
      /**
       * The output directory as absolute path (required).
       *
       * See: http://webpack.github.io/docs/configuration.html#output-path
       */
      path: path.resolve(__dirname, 'dist'),

      /**
        * Specifies the name of each output file on disk.
        * IMPORTANT: You must not specify an absolute path here!
        *
        * See: http://webpack.github.io/docs/configuration.html#output-filename
        */
      filename: '[name].bundle.js',

      /**
        * The filename of the SourceMaps for the JavaScript files.
        * They are inside the output.path directory.
        *
        * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
        */
      sourceMapFilename: '[file].map',

      library: 'ac_[name]',
      libraryTarget: 'var'
    },

    module: {
      rules: [
        /**
         * Css loader support for *.css files (styles directory only)
         * Loads external css styles into the DOM, supports HMR
         *
         */
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        },

        /**
         * Sass loader support for *.scss files (styles directory only)
         * Loads external sass styles into the DOM, supports HMR
         *
         */
        {
          test: /\.scss$/,
          use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }
      ]
    },

    plugins: [

      /**
       * Plugin LoaderOptionsPlugin (experimental)
       *
       * See: https://gist.github.com/sokra/27b24881210b56bbaff7
       */
      new LoaderOptionsPlugin({
        debug: true,
        options: { }
      }),

      new HotModuleReplacementPlugin(),
    ],

    /**
     * Webpack Development Server configuration
     * Description: The webpack-dev-server is a little node.js Express server.
     * The server emits information about the compilation state to the client,
     * which reacts to those events.
     *
     * See: https://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      hot: METADATA.HMR,
      public: METADATA.public,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/
      }
    }

  });
}
