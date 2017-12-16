import React, { Component } from 'react';
import './Queue.css';

class Queue extends Component {
  render() {
    return (
      <div className="queue">
        {this.props.requests.map((req, i) => {
          return (
            <div className="queue-item" key={req.id}>
              {i}: {JSON.stringify(req)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Queue;
