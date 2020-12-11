import React from 'react';
import { TextField } from '../../components';

const TextFieldDemo = () => (
  <>
    <p>This is Disabled Input</p>
    <TextField
      defaultValue="Default Value"
      disabled
    />
    <p>This is valid input</p>
    <TextField
      defaultValue="Default Value"
    />
    <p>An input with error</p>
    <TextField
      defaultValue="101"
      error
    />
    <p style={{ color: 'red', fontSize: '12px' }}>Could not be greater than</p>
  </>
);

export default TextFieldDemo;
