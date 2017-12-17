class Brain {
  static isIdle(elevator) {
    return elevator.isIdle;
  }

  static updateElevator(elevator, field) {
    // Move assigned elevators one floor at a time
    if (elevator.floor === elevator[field]) {
      elevator[field] = null;
    } else if (elevator.floor < elevator[field]) {
      elevator.moveUp();
    } else {
      elevator.moveDown();
    }
  }

  static updateElevators(elevators = []) {
    elevators.forEach(elevator => {
      if (typeof elevator.pickupFloor === 'number') {
        return Brain.updateElevator(elevator, 'pickupFloor');
      } else if (typeof elevator.dropoffFloor === 'number') {
        return Brain.updateElevator(elevator, 'dropoffFloor');
      }
    });
  }
}

export default Brain;
