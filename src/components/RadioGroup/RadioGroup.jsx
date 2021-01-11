/* eslint-disable react/forbid-prop-types */
import { array, func, string } from 'prop-types';
import React from 'react';

const RadioGroup = (props) => {
  const {
    options, onChange, onBlur, error,
  } = props;
  return (
    <>
      <form style={{ marginTop: '20px' }}>
        {
          options.map((element) => (
            <div key={element.value}>
              <input type="radio" name="sports" id={element.label} onBlur={onBlur} value={element.value} onChange={onChange} style={{ marginBottom: '10px' }} />
              <label htmlFor={element.label}>{element.label}</label>
              <br />
            </div>
          ))
        }
      </form>
      <p style={{ marginLeft: '10px', color: 'red' }}>{error}</p>
    </>
  );
};

RadioGroup.propTypes = {
  options: array,
  onChange: func,
  onBlur: func,
  error: string,
};

RadioGroup.defaultProps = {
  options: [],
  onChange: () => {},
  onBlur: () => {},
  error: '',
};

export default RadioGroup;
