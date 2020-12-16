/* eslint-disable jsx-a11y/control-has-associated-label */
import { bool, func, string } from 'prop-types';
import React from 'react';
import { Input } from './style';

const ButtonField = (prop) => {
  const {
    disabled, onClick, value, color,
  } = prop;
  return (
    <>
      <Input type="button" value={value} onClick={onClick} disabled={disabled} color={color} />
    </>
  );
};

ButtonField.prototype = {
  value: string.isRequired,
  onClick: func.isRequired,
  disabled: bool,
};

ButtonField.defaultProps = {
  disabled: false,
};

export default ButtonField;
