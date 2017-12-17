import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

jest.useFakeTimers();

describe('App', () => {
  it('should position elevators', () => {
    const component = renderer.create(
      <App
        savedState={{
          floors: 5,
          elevators: [
            {
              id: 0,
              floor: 0,
              pickupFloor: null,
              dropoffFloor: null,
            },
            {
              id: 1,
              floor: 3,
              pickupFloor: null,
              dropoffFloor: null,
            },
            {
              id: 2,
              floor: 5,
              pickupFloor: null,
              dropoffFloor: null,
            },
          ],
          requests: [],
        }}
      />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should update elevators', () => {
    const component = renderer.create(
      <App
        savedState={{
          floors: 3,
          updateIntervalMs: 1000,
          elevators: [
            {
              id: 0,
              floor: 0,
              pickupFloor: 0,
              dropoffFloor: 3,
            },
            {
              id: 1,
              floor: 2,
              pickupFloor: 2,
              dropoffFloor: 0,
            },
            {
              id: 2,
              floor: 1,
              pickupFloor: 2,
              dropoffFloor: 2,
            },
          ],
          requests: [],
        }}
      />,
    );
    expect(component.toJSON()).toMatchSnapshot();

    const instance = component.getInstance();

    instance.update();
    expect(component.toJSON()).toMatchSnapshot();

    instance.update();
    expect(component.toJSON()).toMatchSnapshot();

    instance.update();
    expect(component.toJSON()).toMatchSnapshot();
  });
});
