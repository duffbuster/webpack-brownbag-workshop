const path = require('path');
const ProvidePlugin = require('webpack').ProvidePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './app/index.js',
    print: './app/print.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  watch: true,

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

    new HtmlWebpackPlugin({
      title: 'Webpack Brownbag',
      template: path.resolve(__dirname, 'app/index.html')
    }),

    new ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    })
  ],

  resolve: {
    extensions: ['.json', '.js', '.css']
  },

  devtool: 'source-map',

  devServer: {
    publicPath: path.join(__dirname, 'dist')
  }
};
