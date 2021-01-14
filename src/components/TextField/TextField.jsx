import { func, string } from 'prop-types';
import React from 'react';
import stylesheet from './style';

const TextField = (prop) => {
  const {
    defaultValue, error, onChange, onBlur, disabled,
  } = prop;
  return (
    <>
      <input type="text" defaultValue={defaultValue} disabled={disabled} onChange={onChange} style={stylesheet.input} onBlur={onBlur} />
      <p style={stylesheet.error}>{error}</p>
    </>
  );
};

TextField.prototype = {
  defaultvalue: string.isRequired,
  error: string,
  onChange: func.isRequired,
};

TextField.defaultProps = {
  error: '',
  disabled: false,
};

export default TextField;
