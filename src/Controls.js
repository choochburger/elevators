import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import './Controls.css';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.updatePickupFloor = this.updatePickupFloor.bind(this);
    this.updateDropoffFloor = this.updateDropoffFloor.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
    this.state = {
      pickupFloor: 0,
      dropoffFloor: 0,
    };
  }

  updatePickupFloor(e) {
    this.setState({ pickupFloor: Number(e.target.value) });
  }

  updateDropoffFloor(e) {
    this.setState({ dropoffFloor: Number(e.target.value) });
  }

  submitRequest() {
    this.props.onRequest(this.state);
  }

  render() {
    return (
      <div className="controls-container">
        <div className="controls">
          <Menu
            num={this.props.numFloors}
            value={this.state.pickupFloor}
            onChange={this.updatePickupFloor}
            label={'Start floor'}
          />
          <Menu
            num={this.props.numFloors}
            value={this.state.dropoffFloor}
            onChange={this.updateDropoffFloor}
            label={'End floor'}
          />
          <button className="controls-go" onClick={this.submitRequest}>
            Go!
          </button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  numFloors: PropTypes.number.isRequired,
};

export default Controls;
