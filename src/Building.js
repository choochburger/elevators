import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Shaft from './Shaft';
import './Building.css';

class Building extends Component {
  render() {
    const numShafts = this.props.numElevators;
    return (
      <div className="building">
        {[...Array(numShafts)].map((_, i) => (
          <Shaft numFloors={this.props.numFloors} key={i} />
        ))}
      </div>
    );
  }
}

Building.propTypes = {
  numFloors: PropTypes.number.isRequired,
  numElevators: PropTypes.number.isRequired,
};

export default Building;
