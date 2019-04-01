import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date().toLocaleTimeString() };
    this.changeTime = this.changeTime.bind(this);
  }
  changeTime() {
    this.setState(state => (state.time = new Date().toLocaleTimeString()));
  }

  componentDidMount() {
    this.timer = setInterval(this.changeTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    console.log('hii');
    return <div>The time is {this.state.time}</div>;
  }
}
export default Clock;
