import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Controls.css';

class Controls extends Component {
  render() {
    return (
      <div className="controls-container">
        <div className="controls">
          <select>
            <option>1</option>
          </select>
          <div className="direction-controls">
            <button className="direction-control direction-control-up" />
            <button className="direction-control direction-control-down" />
          </div>
          <select>
            <option>1</option>
          </select>
          <button className="controls-go">Go!</button>
        </div>
      </div>
    );
  }
}

Controls.propTypes = {
  numFloors: PropTypes.number.isRequired,
};

export default Controls;
