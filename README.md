**This project uses:**

Spdy Express server for production.

Webpack-dev-server for development.

**How to run**

Now uses Mongodb, start the datebase before:

`mongod`

To install dev:

`npm install -g webpack webpack-dev-server http-server`

To run dev:

`npm start`

To install prod:
(since http2 is using tls you need to creat certs)

`
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
openssl rsa -passin pass:x -in server.pass.key -out server.key
rm server.pass.key
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
`

To build prod:

`NODE_ENV=production webpack -p --config webpack.production.config.js`

To run prod:

`"NODE_ENV=production PORT=3000 npm start"`


OBS! https://loacalhost:3000

REMEMBER to remove /public/build when done since express will run it.
