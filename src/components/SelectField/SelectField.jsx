import React from 'react';
import { func, string } from 'prop-types';
import { select } from '../../config/constants';
import stylesheet from './style';

const SelectField = (prop) => {
  const {
    value, error, onChange, options, defaultText, onBlur,
  } = prop;
  return (
    <>
      <select value={value} name="sports" id="Sports" error={error} onChange={onChange} style={stylesheet.selectField} onBlur={onBlur}>
        <option value="">
          {defaultText}
        </option>
        <option value={options[0].label}>
          {options[0].value}
        </option>
        <option value={options[1].label}>
          {options[1].value}
        </option>
      </select>
      <p style={stylesheet.error}>{error}</p>
    </>
  );
};

SelectField.prototype = {
  value: string.isRequired,
  error: string,
  onChange: func.isRequired,
};

SelectField.defaultProps = {
  error: '',
  options: [],
  defaultText: select,
};

export default SelectField;
