var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    express = require('express'),
    opn = require('opn'),
    webpackDevConfig = require('./webpack.config.js');

var compiler = webpack(webpackDevConfig);

var app = express();

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));
app.listen(3003, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at ' + webpackDevConfig.output.publicPath + '\n')
  opn(webpackDevConfig.output.publicPath)
});
