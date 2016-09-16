var React = require('react'),
  DOM = React.DOM,
  body = DOM.body,
  div = DOM.div,
  script = DOM.script,
  ReactDOMServer = require('react-dom/server'),
  App = React.createFactory(require("./Main"));

module.exports = function() {
  var props = {
    'hello': 'world'
  };

  var html = ReactDOMServer.renderToStaticMarkup(body(null, div({
    id: 'app',
    dangerouslySetInnerHTML: {
      __html: ReactDOMServer.renderToString(App())
    }
  }), script({
    dangerouslySetInnerHTML: {
      __html: 'var DEAFULT_VALUES = ' + safeStringify(props) + ';'
    }
  }), script({src: './build/bundle.js'})))

  return html;
}

function safeStringify(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--')
}
