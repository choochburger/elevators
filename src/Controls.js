import React, { Component } from 'react';
import Menu from './Menu';
import './Controls.css';
import { inject } from 'mobx-react';

@inject('numFloors', 'requestStore')
class Controls extends Component {
  constructor(props) {
    super(props);
    this.updatePickupFloor = this.updatePickupFloor.bind(this);
    this.updateDropoffFloor = this.updateDropoffFloor.bind(this);
    this.createRequest = this.createRequest.bind(this);
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

  createRequest() {
    this.props.requestStore.createRequest(
      this.state.pickupFloor,
      this.state.dropoffFloor,
    );
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
          <button className="controls-go" onClick={this.createRequest}>
            Go!
          </button>
        </div>
      </div>
    );
  }
}

export default Controls;
