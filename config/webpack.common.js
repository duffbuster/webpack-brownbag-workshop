const path = require('path');
const webpack = require('webpack');

const ProvidePlugin = require('webpack').ProvidePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (options) {
  const isProd = options.env === 'production';

  return {
    entry: {
      app: './app/index.js'
    },

    resolve: {
      extensions: [ '.json', '.js', '.css', '.scss' ]
    },

    module : {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        }, {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(['./dist']),

      new HtmlWebpackPlugin({
        title: 'Webpack Brownbag',
        template: path.resolve(__dirname, '../app/index.html')
      }),

      /**
       * Provide jQuery for Bootstrap
       */
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  };
};
