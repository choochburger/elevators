import React from 'react';
import App from './App';
import renderer from 'react-test-renderer';

test('Position elevators', () => {
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
            floor: 0,
            pickupFloor: null,
            dropoffFloor: null,
          },
          {
            id: 2,
            floor: 3,
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

