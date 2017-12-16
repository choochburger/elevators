import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shaft from './Shaft';
import './Building.css';

class Building extends Component {
  render() {
    return (
      <div className="building">
        {this.props.elevators.map((elevator, i) => (
          <Shaft elevator={elevator} numFloors={this.props.numFloors} key={i} />
        ))}
      </div>
    );
  }
}

Building.propTypes = {
  numFloors: PropTypes.number.isRequired,
  elevators: PropTypes.array.isRequired,
};

export default Building;
