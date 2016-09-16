var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var fs = require('fs');
var spdy = require('spdy');
var compression = require('compression');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction
  ? process.env.PORT
  : 3000;

var publicPath = path.resolve(__dirname, 'public');

if (!isProduction) {
  var proxy = httpProxy.createProxyServer();

  app.use(function(req, res, next) {
    if (req.url == '/') {
      if (true) {
        var index = require('./server/index');
        res.send(index());
      } else {
        res.sendFile(publicPath + '/index.html');
      }
    } else {
      next();
    }
  });

  app.use(express.static(publicPath));

  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./server/bundle');
  bundle();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', function(req, res) {
    proxy.web(req, res, {target: 'http://localhost:8080'});
  });

  // It is important to catch any errors from the proxy or the
  // server will crash. An example of this is connecting to the
  // server when webpack is bundling
  proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
  });

  app.listen(port, function() {
    console.log('Server running on port ' + port);
  });

} else {
  const serverKey = path.resolve(__dirname, './server.key');
  const serverCrt = path.resolve(__dirname, './server.crt');

  app.use(compression());

  app.use(function(req, res, next) {
    if (req.url == '/') {
      if (true) {
        var index = require('./server/index');
        res.send(index());
      } else {
        res.sendFile(publicPath + '/index.html');
      }
    } else {
      next();
    }
  });

  app.use(express.static(publicPath));

  spdy.createServer({
    key: fs.readFileSync(serverKey),
    cert: fs.readFileSync(serverCrt)
  }, app).listen(port, (err) => {
    if (err) {
      throw new Error(err);
    }
    console.log('Production server running on port ' + port);
  });

}
