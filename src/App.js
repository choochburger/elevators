import React, { Component } from 'react';
import Building from './Building';
import Controls from './Controls';
import './App.css';

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
          floor: 4,
        },
        {
          floor: 2,
        },
      ],
    };

    window.updateElevators = elevators => {
      this.setState({ elevators: elevators });
    };
  }

  handleRequest(req) {
    console.log(req);
  }

  render() {
    return (
      <div className="app">
        <Building numFloors={5} elevators={this.state.elevators} />
        <Controls numFloors={5} onRequest={this.handleRequest} />
      </div>
    );
  }
}

export default App;
