import express from 'express';
import path from 'path';
import fs from 'fs';
import spdy from 'spdy';
import compression from 'compression';
import moment from 'moment';

import graphqlHTTP from 'express-graphql';
import schema from './database/schema';

import index from './render';

const isProduction = process.env.NODE_ENV === 'production';
const useHTTP2 = isProduction && process.env.USEHTTP2
  ? process.env.USEHTTP2
  : false;
const port = isProduction && process.env.PORT
  ? process.env.PORT
  : 3000;

const buildPath = path.resolve(__dirname, '../../public/build');
const publicPath = path.resolve(__dirname, '../../public');

const app = express();

app.use(compression());

app.get('/', (req, res) => {
  index(schema).then((html) => {
    res.send(html);
  });
});

app.use('/graphiql', graphqlHTTP({schema: schema, rootValue: global}));
app.use('/public', express.static(publicPath));
app.use('/build', express.static(buildPath));

if (useHTTP2) {
  const serverKey = path.resolve(__dirname, './server.key');
  const serverCrt = path.resolve(__dirname, './server.crt');
  spdy.createServer({
    key: fs.readFileSync(serverKey),
    cert: fs.readFileSync(serverCrt)
  }, app).listen(port, (err) => {
    if (err) {
      throw new Error(err);
    }
    console.log('HTTP2 production server running on port ' + port);
  });
} else {
  app.listen(port, () => {
    console.log('Production server running on port ' + port);
  });
}
