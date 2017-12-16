import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Controls.css';

const initialState = {
  pickupFloor: 0,
  dropoffFloor: 0,
  direction: 'up',
};

class Controls extends Component {
  constructor(props) {
    super(props);
    this.updatePickupFloor = this.updatePickupFloor.bind(this);
    this.updateDropoffFloor = this.updateDropoffFloor.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
    this.state = initialState;
  }

  resetState() {
    this.setState(initialState);
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
          <div className="direction-controls">
            <button
              className={classNames(
                'direction-control',
                'direction-control-up',
                { 'direction-control-selected': this.state.direction === 'up' },
              )}
              onClick={() => this.setState({ direction: 'up' })}
            />
            <button
              className={classNames(
                'direction-control',
                'direction-control-down',
                {
                  'direction-control-selected': this.state.direction === 'down',
                },
              )}
              onClick={() => this.setState({ direction: 'down' })}
            />
          </div>
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

function Menu(props) {
  return (
    <label>
      {props.label}
      <select onChange={props.onChange} value={props.value}>
        {[...Array(props.num)].map((_, i) => (
          <option val={i} key={i}>
            {i}
          </option>
        ))}
      </select>
    </label>
  );
}

Controls.propTypes = {
  numFloors: PropTypes.number.isRequired,
};

export default Controls;
