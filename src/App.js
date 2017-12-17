import React, { Component } from 'react';
import Building from './Building';
import Controls from './Controls';
import Queue from './Queue';
import Brain from './Brain';
import { Provider } from 'mobx-react';
import './App.css';

let idCounter = 0;

/*
MobX notes...

  Use MobX in strict mode!

  Use actions

  Use DevTools

  Create stores at root of application

  Use Provider component to wrap app and access data

*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.savedState || {
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
      requests: [],
    };
    this.handleRequest = this.handleRequest.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  handleRequest(req) {
    const requests = this.state.requests.slice();
    requests.push({ ...req, id: idCounter++ });
    this.setState({ requests: requests });
  }

  update() {
    const { elevators, requests } = Brain.processRequests(
      this.state.elevators,
      this.state.requests,
    );

    this.setState(
      {
        elevators: Brain.updateElevators(elevators),
        requests: requests,
      },
      () => setTimeout(this.update, this.state.updateIntervalMs),
    );
  }

  render() {
    return (
      <Provider numFloors={5}>
        <div className="app">
          <Building elevators={this.state.elevators} />
          <Controls onRequest={this.handleRequest} />
          <Queue requests={this.state.requests} />
        </div>
      </Provider>
    );
  }
}

export default App;
