import React, { Component } from 'react';
import Shaft from './Shaft';
import { inject, observer } from 'mobx-react';
import './Building.css';

@inject('elevatorStore')
@observer
class Building extends Component {
  render() {
    const elevators = this.props.elevatorStore.elevators;
    return (
      <div className="building">
        {elevators.map(elevator => (
          <Shaft elevator={elevator} key={elevator.id} />
        ))}
      </div>
    );
  }
}

export default Building;
