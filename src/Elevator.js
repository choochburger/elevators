import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Elevator.css';

class Elevator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bottom: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.floor !== this.state.floor) {
      this.updatePosition(nextProps.floor);
    }
  }

  render() {
    return (
      <div
        className="elevator"
        style={{ bottom: this.state.bottom }}
        ref={el => (this.el = el)}
      />
    );
  }

  updatePosition(floor) {
    const height = (this.el || {}).clientHeight || 50;
    this.setState({
      bottom: floor * height,
    });
  }
}

Elevator.propTypes = {
  floor: PropTypes.number.isRequired,
};

export default Elevator;
