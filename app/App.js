import React from 'react';
import ReactDOM from 'react-dom';
import Photon from './Main';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Photon/>, document.getElementById('app'));
