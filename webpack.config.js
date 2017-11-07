const path = require('path');
const webpack = require('webpack');

const ProvidePlugin = require('webpack').ProvidePlugin;

/**
 * This is a super basic webpack config that just bundles up the js and scss
 */
module.exports = {

  /**
   * Developer tool to enhance debugging
   *
   * See: http://webpack.github.io/docs/configuration.html#devtool
   * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
   */
  devtool: 'cheap-module-source-map',

  entry: './app/index.js', // Tell webpack where our app starts

  resolve: { // Tell webpack to resolve file extensions so we don't have to type them
    extensions: [ '.js', '.css', 'scss' ]
  },

  module: {
    rules: [

      /**
       * Css loader support for *.css files
       * Loads external css styles into the DOM, supports HMR
       *
       */
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },

      /**
       * Sass loader support for *.scss files
       * Loads external sass styles into the DOM, supports HMR
       *
       */
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },

      /**
       * Babel Loader support for *.js files
       * Loads js into a file
       */
      {
        test: /\.js$/,
        use: [ 'babel-loader' ]
      },

      /**
       * Loader support for font files
       */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader' ]
      },

      /**
       * Loader support for image files
       */
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]
      }
    ]
  },

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
    filename: 'app.bundle.js',
  },

  plugins: [

    /**
     * Provide jQuery for Bootstrap
     */
    // new ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery',
    //   Popper: [ 'popper.js', 'default' ]
    // })
  ]
}
