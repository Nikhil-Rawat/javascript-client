import React from 'react';
import stylesheet from './style';

const TextField = (prop) => {
  const { defaultValue, disabled, error } = prop;
  let style = stylesheet.input;
  if (error) {
    style = { ...stylesheet.input, ...stylesheet.errorinput };
  }
  return (
    <>
      <input type="text" defaultValue={defaultValue} disabled={disabled} style={style} />
    </>
  );
};

export default TextField;
