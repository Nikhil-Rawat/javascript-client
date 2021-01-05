/* eslint-disable jsx-a11y/control-has-associated-label */
import { bool, func, string } from 'prop-types';
import React from 'react';
import { Input } from './style';

const ButtonField = (props) => {
  const {
    disabled, onClick, value, color,
  } = props;
  return (
    <>
      <Input type="button" value={value} onClick={onClick} disabled={disabled} color={color} />
    </>
  );
};

ButtonField.propTypes = {
  value: string.isRequired,
  onClick: func.isRequired,
  disabled: bool,
  color: string.isRequired,
};

ButtonField.defaultProps = {
  disabled: false,
};

export default ButtonField;
