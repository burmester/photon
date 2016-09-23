import React from 'react';
import ReactDOM from 'react-dom';
import Photon from './Main';

import '../public/sass/styles.scss';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Photon data={window.default_props.data} />, document.getElementById('app'));
