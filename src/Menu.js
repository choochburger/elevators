import React from 'react';
import PropTypes from 'prop-types';

function Menu(props) {
  return (
    <label>
      {props.label}
      <select onChange={props.onChange} value={props.value}>
        {[...Array(props.num)].map((_, i) => (
          <option val={i} key={i}>
            {i}
          </option>
        ))}
      </select>
    </label>
  );
}

Menu.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired,
};

export default Menu;
