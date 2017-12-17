import React, { Component } from 'react';
import Building from './Building';
import Controls from './Controls';
import Queue from './Queue';
import Brain from './Brain';
import { Provider } from 'mobx-react';
import ElevatorRequestStore from './models/ElevatorRequestStore';
import DevTools from 'mobx-react-devtools';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {
        floors: 5,
        updateIntervalMs: 1000,
        elevators: [
          {
            id: 0,
            floor: 0,
            pickupFloor: null,
            dropoffFloor: null,
          },
          {
            id: 1,
            floor: 0,
            pickupFloor: null,
            dropoffFloor: null,
          },
          {
            id: 2,
            floor: 0,
            pickupFloor: null,
            dropoffFloor: null,
          },
        ],
      },
      props.savedState,
    );
    this.elevatorRequestStore = new ElevatorRequestStore();
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const { elevators } = this.state;
    Brain.processRequests(elevators, this.elevatorRequestStore.requests);
    Brain.updateElevators(elevators);
    this.setState({ elevators: elevators }, () =>
      setTimeout(this.update, this.state.updateIntervalMs),
    );
  }

  render() {
    return (
      <Provider numFloors={5} elevatorRequestStore={this.elevatorRequestStore}>
        <div className="app">
          <DevTools />
          <Building elevators={this.state.elevators} />
          <Controls />
          <Queue />
        </div>
      </Provider>
    );
  }
}

export default App;
