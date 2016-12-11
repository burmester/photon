import React from 'react';
import Header from './components/layout/header';
import Content from './components/layout/content';
import Naviagtion from './components/layout/naviagtion';

// import '../public/sass/main.scss';

export default class Photon extends React.Component {
  componentDidMount () {
  }

  componentDidUpdate () {
  }

  render () {
    return (
      <div>
        <Header />
        <Content users={this.props.data.users} />
        <Naviagtion />
      </div>
    );
  }
}

Photon.propTypes = {
  data: React.PropTypes.object
};
