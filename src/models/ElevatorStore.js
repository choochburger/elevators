import { action, observable, computed } from 'mobx';
import uuid from 'uuid';

class ElevatorStore {
  @observable elevators = [];

  constructor(numElevators) {
    [...Array(numElevators)].forEach(() => this.elevators.push(new Elevator()));
  }

  @action
  handleRequest(elevatorRequest) {}
}

class Elevator {
  id;

  @observable floor;
  @observable pickupFloor;
  @observable dropoffFloor;

  constructor(floor = 0, pickupFloor, dropoffFloor) {
    this.id = uuid.v4();
    this.floor = floor;
    this.pickupFloor = pickupFloor;
    this.dropoffFloor = dropoffFloor;
  }

  @computed
  get isIdle() {
    return (
      typeof this.pickupFloor !== 'number' &&
      typeof this.dropoffFloor !== 'number'
    );
  }

  @action
  moveUp() {
    this.floor++;
  }

  @action
  moveDown() {
    this.floor--;
  }
}

export default ElevatorStore;
