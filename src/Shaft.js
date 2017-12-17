import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Elevator from './Elevator';
import { inject, observer, PropTypes } from 'mobx-react';
import './Shaft.css';

@inject('numFloors')
@observer
class Shaft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 100,
      height: 50,
    };
  }

  componentDidMount() {
    this.resize();
  }

  render() {
    const { elevator } = this.props;
    return (
      <div
        className="shaft"
        style={{
          width: this.state.width,
          height: this.state.height,
        }}
      >
        <Elevator floor={elevator.floor} ref={el => (this.elevator = el)} />
      </div>
    );
  }

  resize() {
    const elevatorNode = ReactDOM.findDOMNode(this.elevator) || {
      clientWidth: 10,
      clientHeight: 10,
    };
    const elevatorWidth = elevatorNode.clientWidth;
    const elevatorHeight = elevatorNode.clientHeight;
    const shaftHeight = this.props.numFloors * elevatorHeight;
    this.setState({
      width: elevatorWidth,
      height: shaftHeight,
    });
  }
}

Shaft.propTypes = {
  elevator: PropTypes.observableObject.isRequired,
};

export default Shaft;
