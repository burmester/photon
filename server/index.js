import React from 'react';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import main from '../app/Main';

const App = React.createFactory(main);

module.exports = function() {
  const props = {
    'hello': 'world'
  };

  let html = renderToStaticMarkup(React.DOM.body(null, React.DOM.div({
    id: 'app',
    dangerouslySetInnerHTML: {
      __html: renderToString(App())
    }
  }), React.DOM.script({
    dangerouslySetInnerHTML: {
      __html: 'var DEAFULT_VALUES = ' + safeStringify(props) + ';'
    }
  }), React.DOM.script({src: './build/bundle.js'})))

  return html;
}

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
