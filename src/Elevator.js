import React, { Component } from 'react';
import './Elevator.css';

class Elevator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFloor: this.props.currentFloor || 0,
    };
  }

  render() {
    return <div className="elevator" style={{ bottom: 0 }} />;
  }
}

export default Elevator;
