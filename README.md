This project uses;

Spdy Express server for production.
Webpack-dev-server for development.

To run development;
use "npm start" and it will hotload changes.

To run prod;
use "NODE_ENV=production webpack -p --config webpack.production.config.js" to build a bundle
then run the server with "NODE_ENV=production PORT=3000 npm start"
REMEMBER to remove /public/build when done since express will run it.

Thanks to:

Environment Boilerplate
http://www.christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup

For HTTP/2
https://medium.com/@imjacobclark/http-2-with-node-js-85da17322812#.f7montxlf
