import React from 'react';
import { func, string } from 'prop-types';

const RadioGroup = (prop) => {
  const {
    onChange, options, error, onBlur,
  } = prop;
  return (
    <>
      <div>
        <input type="radio" name="role" id="Role" value={options[0].value} onChange={onChange} onBlur={onBlur} />
        <label htmlFor={options[0].label}>
          {options[0].value}
        </label>
      </div>
      <div>
        <input type="radio" name="role" id="Role" value={options[1].value} onChange={onChange} onBlur={onBlur} />
        <label htmlFor={options[1].label}>
          {options[1].value}
        </label>
      </div>
      <div>
        <input type="radio" name="role" id="Role" value={options[2].value} onChange={onChange} onBlur={onBlur} />
        <label htmlFor={options[2].label}>
          {options[2].value}
        </label>
      </div>
      <div>
        <input type="radio" name="role" id="Role" value={options[3].value} onChange={onChange} onBlur={onBlur} />
        <label htmlFor={options[0].label}>
          {options[3].value}
        </label>
      </div>
      <p>{error}</p>
    </>
  );
};

RadioGroup.prototype = {
  defaultvalue: string.isRequired,
  error: string,
  onChange: func.isRequired,
};

RadioGroup.defaultProps = {
  error: '',
  options: [],
};

export default RadioGroup;
