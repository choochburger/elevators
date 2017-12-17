import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Queue.css';

@inject('elevatorRequestStore')
@observer
class Queue extends Component {
  render() {
    const { elevatorRequests } = this.props.elevatorRequestStore;
    return (
      <div className="queue">
        <h3>Pending:</h3>
        {elevatorRequests.length
          ? elevatorRequests.map(elevatorRequest => (
              <QueueItem
                elevatorRequest={elevatorRequest}
                key={elevatorRequest.id}
              />
            ))
          : 'All elevator requests fulfilled'}
      </div>
    );
  }
}

@observer
class QueueItem extends Component {
  render() {
    return (
      <div className="queue-item">
        {JSON.stringify(this.props.elevatorRequest)}
      </div>
    );
  }
}

export default Queue;
