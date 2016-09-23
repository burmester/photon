import React from 'react';
import {renderToString} from 'react-dom/server';
import main from '../app/Main';
import {graphql} from 'graphql';
import Q from 'q';

const App = React.createFactory(main);
const firstLoadQuery = "{users{name }}"

export default function(schema) {

  let deferred = Q.defer();

  graphql(schema, firstLoadQuery).then(props => {
    const body = renderToString(App(props));
    const html = `<!doctype html>
  <html>
    <head>
      <script async src="./build/bundle.js"></script>
      <link rel="stylesheet" href="./sass/styles.css">
    </head>
    <body>
      <div id="app">${body}</div>
      <script>
        var default_props = ${safeStringify(props)};
      </script>
    </body>
  </html>`;
    deferred.resolve(html);
  })

  return deferred.promise
}

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
