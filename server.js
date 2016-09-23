import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';
import fs from 'fs';
import spdy from 'spdy';
import compression from 'compression';
import moment from 'moment';
import bodyParser from 'body-parser';

import graphqlHTTP from 'express-graphql';
import schema from './server/database/schema';

import index from './server/index';
import bundle from './server/bundle';

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction
  ? process.env.PORT
  : 3000;

const publicPath = path.resolve(__dirname, 'public');
const app = express();

if (!isProduction) {
  let proxy = httpProxy.createProxyServer();

  app.use((req, res, next) => {
    console.log(moment().format('hh:mm:ss'), req.method, req.url);
    next();
  });

  app.get('/', (req, res) => {
      index(schema).then((html) => {
        res.send(html);
      });
  });

  app.use('/graphiql', graphqlHTTP({schema: schema, rootValue: global, graphiql: true, pretty: true}));

  app.use(express.static(publicPath));

  bundle();

  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {target: 'http://localhost:8080'});
  });

  proxy.on('error', (e) => {
    console.log('Could not connect to proxy, please try again...');
  });

  app.listen(port, () => {
    console.log('Development server running on port ' + port);
  });

} else {
  const serverKey = path.resolve(__dirname, './server.key');
  const serverCrt = path.resolve(__dirname, './server.crt');

  app.use(compression());

  app.get('/', (req, res) => {
    index(schema).then((html) => {
      res.send(html);
    });
  });

  app.use('/graphiql', graphqlHTTP({schema: schema, rootValue: global}));

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
