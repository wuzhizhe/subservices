var webpack = require('webpack'),
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

// var publicPath = './';
var publicPath = 'http://localhost:3003/';

module.exports = {
	entry: {
    main: ['./src/main.js', 'webpack-hot-middleware/client?reload=true']
  },
	output: {
    // filename: './[name]/bundle.js',
    filename: '[name].[hash].js',
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
          test: /\.(ttf|eot|woff(2)?|otf)$/,
          loader: 'file-loader',
          options: {
              name: 'fonts/' + '[hash:9].[name].[ext]?[hash]'
          }
        },
        {
          test: /\.(gif|jpg|png|svg)$/,
          loader: 'url-loader',
          options: {
              limit: 8192,
              name: 'images/' + '[hash:8].[name].[ext]?[hash]',
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

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

};
