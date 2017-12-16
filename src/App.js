import React, { Component } from 'react';
import Building from './Building';
import Controls from './Controls';
import Queue from './Queue';
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
    // TODO: move this logic into a main logic controller...

    // Grab first empty elevator and send topickupFloor

    const elevators = this.state.elevators.slice();
    const requests = this.state.requests.slice();

    function isIdle(elevator) {
      return elevator.pickupFloor === null && elevator.dropoffFloor === null;
    }

    function isInTransit(elevator) {
      return !isIdle(elevator);
    }

    // Assign idle elevators
    elevators.filter(isIdle).forEach(elevator => {
      if (requests.length) {
        const request = requests.pop();
        elevator.pickupFloor = request.pickupFloor;
        elevator.dropoffFloor = request.dropoffFloor;
      }
    });

    // Move assigned elevators one floor at a time
    elevators.filter(isInTransit).forEach(elevator => {
      if (elevator.pickupFloor !== null) {
        if (elevator.floor === elevator.pickupFloor) {
          elevator.pickupFloor = null;
        } else if (elevator.floor < elevator.pickupFloor) {
          elevator.floor++;
        } else {
          elevator.floor--;
        }
      } else if (elevator.dropoffFloor !== null) {
        if (elevator.floor === elevator.dropoffFloor) {
          elevator.dropoffFloor = null;
        } else if (elevator.floor < elevator.dropoffFloor) {
          elevator.floor++;
        } else {
          elevator.floor--;
        }
      }
    });

    this.setState(
      {
        elevators: elevators,
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
