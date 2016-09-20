import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';
import fs from 'fs';
import spdy from 'spdy';
import compression from 'compression';
import moment from 'moment';
import bodyParser from 'body-parser';

import {graphql} from 'graphql';
import graphqlHTTP from 'express-graphql';

import index from './server/index';
import bundle from './server/bundle';

import db from './server/database/mongoose';
import schema from './server/database/schema';

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

  const useSSR = true;
  app.get('/', (req, res) => {
    if (useSSR) {
      res.send(index());
    } else {
      res.sendFile(publicPath + '/index.html');
    }
  });

  app.use(bodyParser.json());

  app.post('/rest', (req, res) => {
    db.create(parseInt(req.body.weight)).then((weight) => {
      res.status(201).json(weight);
    })
  });

  app.get('/rest', (req, res) => {
    db.find().then((weights) => {
      res.status(200).json(weights);
    })
  });

  app.post('/graphql', (req, res) => {
    graphql(schema, req.body).then(result => res.send(result));
  });

  app.use('/graphiql', graphqlHTTP({schema: schema, rootValue: global, graphiql: true}));

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
    res.send(index());
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
