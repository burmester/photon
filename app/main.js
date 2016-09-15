import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Naviagtion from './components/layout/Naviagtion';

import '../public/sass/main.scss';

class Photon extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div>
        <Header/>
        <Content/>
        <Naviagtion/>
      </div>
    )
  }
}

ReactDOM.render(
  <Photon/>, document.getElementById('app'));
