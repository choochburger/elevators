import React, { Component } from 'react';
import Building from './Building';
import Controls from './Controls';
import Queue from './Queue';
import Brain from './Brain';
import { Provider } from 'mobx-react';
import RequestStore from './models/RequestStore';
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
    this.requestStore = new RequestStore();
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const { elevators } = this.state;
    Brain.processRequests(elevators, this.requestStore.requests);
    Brain.updateElevators(elevators);
    this.setState({ elevators: elevators }, () =>
      setTimeout(this.update, this.state.updateIntervalMs),
    );
  }

  render() {
    return (
      <Provider numFloors={5} requestStore={this.requestStore}>
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
