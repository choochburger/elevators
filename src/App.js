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
          floor: 0,
        },
        {
          floor: 0,
        },
        {
          floor: 0,
        },
      ],
      requests: [],
    };
    this.handleRequest = this.handleRequest.bind(this);

    window.updateElevators = elevators => {
      this.setState({ elevators: elevators });
    };
  }

  handleRequest(req) {
    const requests = this.state.requests.slice();
    requests.push({ ...req, id: id++ });
    this.setState({ requests: requests });
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
