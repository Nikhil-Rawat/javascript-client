import { func, string } from 'prop-types';
import React from 'react';
import stylesheet from './style';

// const TextField = (prop) => {
//   const { defaultValue, disabled, error } = prop;
//   let style = stylesheet.input;
//   if (error) {
//     style = { ...stylesheet.input, ...stylesheet.errorinput };
//   }
//   return (
//     <>
//       <input type="text" defaultValue={defaultValue} disabled={disabled} style={style} />
//     </>
//   );
// };

const TextField = (prop) => {
  const { defaultValue, error, onChange } = prop;
  return (
    <>
      <input type="text" defaultValue={defaultValue} error={error} onChange={onChange} style={stylesheet.input} />
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
};

export default TextField;
