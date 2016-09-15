
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/counter'

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: props.count,
    };
   }

   componentDidMount () {
     setTimeout(function(){
       this.setState({count: this.state.count+1});
     }.bind(this),1000)
   }

  componentDidUpdate () {
    setTimeout(function(){
      this.setState({count: this.state.count+5});
    }.bind(this),1000)
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <Counter count={this.state.count} repeat={true}/>
      </div>
    )
  }
}



ReactDOM.render(<World count={1}/>, document.getElementById('helloworld'));
