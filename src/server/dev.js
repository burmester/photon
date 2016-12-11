import express from 'express';
import path from 'path';
import httpProxy from 'http-proxy';
import moment from 'moment';

import graphqlHTTP from 'express-graphql';
import schema from './database/schema';

import index from './render';
import bundle from './bundle';

const port = 3000;
const publicPath = path.resolve(__dirname, '../../public');
const app = express();

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

app.use('/public', express.static(publicPath));

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
