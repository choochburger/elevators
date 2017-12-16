import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Elevator from './Elevator';
import './Shaft.css';

class Shaft extends Component {
  constructor(props) {
    super(props);
    this.sizeShaft = this.sizeShaft.bind(this);
    this.state = {
      width: 100,
      height: 50,
    };
  }

  render() {
    return (
      <div
        className="shaft"
        style={{
          width: this.state.width,
          height: this.state.height,
        }}
      >
        <Elevator
          currentFloor={0}
          numFloors={this.props.numFloors}
          ref={this.sizeShaft}
        />
      </div>
    );
  }

  sizeShaft(elevator) {
    const elevatorNode = ReactDOM.findDOMNode(elevator);
    const elevatorWidth = elevatorNode.clientWidth;
    const elevatorHeight = elevatorNode.clientHeight;
    const shaftHeight = this.props.numFloors * elevatorHeight;
    this.setState({
      width: elevatorWidth,
      height: shaftHeight,
    });
  }
}

Shaft.propTypes = {
  numFloors: PropTypes.number.isRequired,
};

export default Shaft;
