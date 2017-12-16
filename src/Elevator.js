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
      const height = this.el.clientHeight;
      this.setState({
        bottom: nextProps.floor * height,
      });
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
}

Elevator.propTypes = {
  floor: PropTypes.number.isRequired,
};

export default Elevator;
