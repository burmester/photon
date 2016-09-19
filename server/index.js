import React from 'react';
import {renderToString} from 'react-dom/server';
import main from '../app/Main';

const App = React.createFactory(main);

module.exports = function() {
  const props = {
    'hello': 'world'
  };

  const body = renderToString(App());
  const html = `<!doctype html>
<html>
  <head>
    <script async src="./build/bundle.js"></script>
    <link rel="stylesheet" href="./sass/styles.css">
  </head>
  <body>
    <div id="app">${body}</div>
    <script>
      var DEAFULT_VALUES = ${safeStringify(props)};
    </script>
  </body>
</html>`;

  return html;
}

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
