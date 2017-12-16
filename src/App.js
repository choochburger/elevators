import React, { Component } from 'react';
import Building from './Building';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Building numFloors={5} numElevators={3} />
      </div>
    );
  }
}

export default App;
