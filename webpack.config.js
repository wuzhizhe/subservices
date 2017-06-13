var webpack = require('webpack'),
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

var publicPath = 'http://localhost:3003/';

module.exports = {
	entry: {
    main: ['./src/main.js', 'webpack-hot-middleware/client?reload=true']
  },
	output: {
    filename: './[name]/bundle.js',
    // filename: '[name].[hash].js',
		path: path.resolve(__dirname, 'dist'),
    publicPath: publicPath
	},
  module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              use: 'css-loader'
            })
        },
        {
          test: /\.s[a|c]ss$/,
          loader: 'style!css!sass'
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [require('babel-plugin-transform-object-rest-spread'), 'transform-runtime']
            }
          }
        },
        {
          test: /\.(gif|jpg|png|svg|ttf|eot|woff|otf)$/,//(png|jpg|gif|svg)
          loader: 'file-loader',
          options: {
              name: '[path][name].[ext]?[hash]'
          }
        },
        {
          test: /\.(gif|png|jpg)$/,
          loader: 'url-loader',
          options: {
              limit: 8192,
              name: '[path][name].[ext]?[hash]',
          }
        }
      ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
           return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),

    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

};
