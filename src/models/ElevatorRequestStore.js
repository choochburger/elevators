import { action, observable } from 'mobx';
import uuid from 'uuid';

class ElevatorRequestStore {
  @observable elevatorRequests = [];

  @action
  createRequest(pickupFloor, dropoffFloor) {
    const request = new ElevatorRequest(pickupFloor, dropoffFloor);
    this.elevatorRequests.push(request);
  }
}

class ElevatorRequest {
  id;

  @observable pickupFloor;
  @observable dropoffFloor;

  constructor(pickupFloor, dropoffFloor) {
    this.id = uuid.v4();
    this.pickupFloor = pickupFloor;
    this.dropoffFloor = dropoffFloor;
  }
}

export default ElevatorRequestStore;
