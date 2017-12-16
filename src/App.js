import React, { Component } from 'react';
import Building from './Building';
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

  render() {
    return (
      <div className="app">
        <Building numFloors={5} elevators={this.state.elevators} />
      </div>
    );
  }
}

export default App;
