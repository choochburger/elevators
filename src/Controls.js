import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './Controls.css';

const initialState = {
  startFloor: 0,
  endFloor: 0,
  direction: 'up',
};

class Controls extends Component {
  constructor(props) {
    super(props);
    this.updateStartFloor = this.updateStartFloor.bind(this);
    this.updateEndFloor = this.updateEndFloor.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
    this.state = initialState;
  }

  resetState() {
    this.setState(initialState);
  }

  updateStartFloor(e) {
    this.setState({ startFloor: Number(e.target.value) });
  }

  updateEndFloor(e) {
    this.setState({ endFloor: Number(e.target.value) });
  }

  submitRequest() {
    this.props.onRequest(this.state);
    this.resetState();
  }

  render() {
    return (
      <div className="controls-container">
        <div className="controls">
          <Menu
            num={this.props.numFloors}
            value={this.state.startFloor}
            onChange={this.updateStartFloor}
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
            value={this.state.endFloor}
            onChange={this.updateEndFloor}
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
