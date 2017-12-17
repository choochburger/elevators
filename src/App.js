import React, { Component } from 'react';
import Building from './Building';
import Controls from './Controls';
import Queue from './Queue';
import Brain from './Brain';
import './App.css';

let idCounter = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floors: 5,
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
          floor: 3,
          pickupFloor: null,
          dropoffFloor: null,
        },
        {
          id: 3,
          floor: 2,
          pickupFloor: null,
          dropoffFloor: null,
        },
        {
          id: 4,
          floor: 2,
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
      () => setTimeout(this.update, 1000),
    );
  }

  render() {
    return (
      <div className="app">
        <Building
          numFloors={this.state.floors}
          elevators={this.state.elevators}
        />
        <Controls
          numFloors={this.state.floors}
          onRequest={this.handleRequest}
        />
        <Queue requests={this.state.requests} />
      </div>
    );
  }
}

export default App;
