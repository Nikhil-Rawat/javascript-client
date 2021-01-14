import { Typography } from '@material-ui/core';
import React from 'react';
import { Math } from '../../components';

const ChildrenDemo = () => (
  <div style={{ margin: '20px', fontSize: '15px' }}>
    <Math first={7} second={4} operator="+" />
    <Math first={7} second={4} operator="+">
      {
        (first, second, result) => (
          <p>
            {`Sum of ${first} and ${second} is ${result}`}
          </p>
        )
      }
    </Math>
    <Math first={7} second={4} operator="+">
      {
        (first, second, result) => (
          <Typography variant="inherit" color="primary">
            {`When we add ${first} with ${second} then we will get ${result} as result`}
          </Typography>
        )
      }
    </Math>
  </div>
);

export default ChildrenDemo;
