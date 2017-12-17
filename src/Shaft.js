import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Elevator from './Elevator';
import './Shaft.css';

class Shaft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 50,
    };
  }

  componentDidMount() {
    this.resize();
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
          floor={this.props.elevator.floor}
          ref={el => (this.elevator = el)}
        />
      </div>
    );
  }

  resize() {
    const elevatorNode = ReactDOM.findDOMNode(this.elevator) || {
      clientWidth: 10,
      clientHeight: 10,
    };
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
  elevator: PropTypes.object.isRequired,
  numFloors: PropTypes.number.isRequired,
};

export default Shaft;
