import React from 'react';
import { func, string } from 'prop-types';
import { select } from '../../config';
import stylesheet from './style';

const SelectField = (prop) => {
  const {
    value, error, onChange, options, defaultText,
  } = prop;
  return (
    <>
      <select value={value} name="sports" id="Sports" error={error} onChange={onChange} style={stylesheet.selectField}>
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
