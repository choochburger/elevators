import React, { Component } from 'react';
import Building from './Building';
import Controls from './Controls';
import Queue from './Queue';
import './App.css';

let id = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      floors: 5,
      elevators: [
        {
          id: 0,
          floor: 0,
          destination: null,
        },
        {
          id: 1,
          floor: 0,
          destination: null,
        },
        {
          id: 2,
          floor: 0,
          destination: null,
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
    requests.push({ ...req, id: id++ });
    this.setState({ requests: requests });
  }

  update() {
    // TODO: move this logic into a main logic controller...

    // Grab first empty elevator and send to destination

    const elevators = this.state.elevators.slice();
    const requests = this.state.requests.slice();

    // Assign idle elevators
    elevators
      .filter(elevator => elevator.destination === null)
      .forEach(unassignedElevator => {
        if (requests.length) {
          const request = requests.pop();
          unassignedElevator.destination = request.endFloor;
        }
      });

    // Move assigned elevators one floor at a time
    elevators
      .filter(elevator => elevator.destination !== null)
      .forEach(assignedElevator => {
        if (assignedElevator.floor === assignedElevator.destination) {
          assignedElevator.destination = null;
        } else {
          if (assignedElevator.floor < assignedElevator.destination) {
            assignedElevator.floor++;
          } else {
            assignedElevator.floor--;
          }
        }
      });

    this.setState(
      {
        elevators: elevators,
        requests: requests,
      },
      () => setTimeout(this.update, 3000),
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
