import React, { Component } from 'react';
import Building from './Building';
import Controls from './Controls';
import Queue from './Queue';
import Brain from './Brain';
import { Provider } from 'mobx-react';
import ElevatorStore from './models/ElevatorStore';
import ElevatorRequestStore from './models/ElevatorRequestStore';
import DevTools from 'mobx-react-devtools';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateIntervalMs = 1000;
    this.elevatorStore = new ElevatorStore(3);
    this.elevatorRequestStore = new ElevatorRequestStore();
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const { elevators } = this.elevatorStore;
    Brain.processRequests(elevators, this.elevatorRequestStore.requests);
    Brain.updateElevators(elevators);
    this.setState({ elevators: elevators }, () =>
      setTimeout(this.update, this.updateIntervalMs),
    );
  }

  render() {
    return (
      <Provider
        numFloors={5}
        elevatorStore={this.elevatorStore}
        elevatorRequestStore={this.elevatorRequestStore}
      >
        <div className="app">
          <DevTools />
          <Building />
          <Controls />
          <Queue />
        </div>
      </Provider>
    );
  }
}

export default App;
