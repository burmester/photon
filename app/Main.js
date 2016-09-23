import React from 'react';
import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Naviagtion from './components/layout/Naviagtion';

//import '../public/sass/main.scss';

export default class Photon extends React.Component {
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
        <Content users={this.props.data.users}/>
        <Naviagtion/>
      </div>
    )
  }
}
