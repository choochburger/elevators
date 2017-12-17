import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import './Queue.css';

@inject('elevatorRequestStore')
@observer
class Queue extends Component {
  render() {
    const { requests } = this.props.elevatorRequestStore;
    return (
      <div className="queue">
        {requests.map(request => (
          <QueueItem request={request} key={request.id} />
        ))}
      </div>
    );
  }
}

@observer
class QueueItem extends Component {
  render() {
    return (
      <div className="queue-item">{JSON.stringify(this.props.request)}</div>
    );
  }
}

export default Queue;
