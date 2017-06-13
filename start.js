var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    express = require('express'),
    opn = require('opn'),
    path = require('path'),
    webpackDevConfig = require('./webpack.config.js');

var compiler = webpack(webpackDevConfig);

var app = express();
var reload = require('reload');
var http = require('http');

// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {
    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler, {
  reload: true
}));

app.use(express.static('./src/public'));
require('./server/routes')(app);

var server = http.createServer(app);
reload(server, app);

server.listen(3003, function(err){
    if (err) {
    console.log(err)
    return
  }
  console.log('Listening at ' + webpackDevConfig.output.publicPath + '\n')
  opn(webpackDevConfig.output.publicPath)
});
