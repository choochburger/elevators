class Brain {
  static isIdle(elevator) {
    return elevator.pickupFloor === null && elevator.dropoffFloor === null;
  }

  static isInTransit(elevator) {
    return !Brain.isIdle(elevator);
  }

  static processRequests(elevators = [], requests = []) {
    const nextElevators = elevators.slice();
    const nextRequests = requests.slice();

    nextElevators.filter(Brain.isIdle).forEach(elevator => {
      if (nextRequests.length) {
        const request = nextRequests.pop();
        elevator.pickupFloor = request.pickupFloor;
        elevator.dropoffFloor = request.dropoffFloor;
      }
    });

    return { elevators: nextElevators, requests: nextRequests };
  }

  static updateElevator(elevator, field) {
    // Move assigned elevators one floor at a time
    const nextElevator = Object.assign({}, elevator);
    if (nextElevator.floor === nextElevator[field]) {
      nextElevator[field] = null;
    } else if (nextElevator.floor < nextElevator[field]) {
      nextElevator.floor++;
    } else {
      nextElevator.floor--;
    }
    return nextElevator;
  }

  static updateElevators(elevators = []) {
    return elevators.map(elevator => {
      if (elevator.pickupFloor !== null) {
        return Brain.updateElevator(elevator, 'pickupFloor');
      } else if (elevator.dropoffFloor !== null) {
        return Brain.updateElevator(elevator, 'dropoffFloor');
      }
      return elevator;
    });
  }
}

export default Brain;
