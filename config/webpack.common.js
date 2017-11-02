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
      extensions: ['.json', '.js', '.css']
    },

    module: {
      rules: [
        {
          test: /.js?$/,
          include: [path.resolve(__dirname, 'app')],
          exclude: [path.resolve(__dirname, 'node_modules')],
          loader: 'babel-loader',
          query: {
            presets: ['env']
          }
        }, {
          test: /\.(scss)$/,
          use: [
            {
              loader: 'style-loader', // inject CSS to page
            }, {
              loader: 'css-loader', // translates CSS into CommonJS modules
            }, {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins: function () { // post css plugins, can be exported to postcss.config.js
                  return [require('precss'), require('autoprefixer')];
                }
              }
            }, {
              loader: 'sass-loader' // compiles SASS to CSS
            }
          ]
        }, {
          test: /\.css?$/,
          use: [
            {
              loader: 'style-loader', // inject CSS to page
            }, {
              loader: 'css-loader', // translates CSS into CommonJS modules
            }
          ]
        }, {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        }, {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        }
      ]
    },

    plugins: [
      // TODO: Add the CleanWebpackPlugin
      // new CleanWebpackPlugin(['./dist']),

      // TODO: Add the HtmlWebpackPlugin
      // new HtmlWebpackPlugin({
      //   title: 'Webpack Brownbag',
      //   template: path.resolve(__dirname, 'app/index.html')
      // }),

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
