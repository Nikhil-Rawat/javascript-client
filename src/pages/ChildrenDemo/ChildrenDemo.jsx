import { Typography } from '@material-ui/core';
import React from 'react';
import { Math } from '../../components';

const ChildrenDemo = () => (
  <>
    <Math first={4} second={5} operator="+">
      {
        (item) => (
          <p>
            Sum of
            {' '}
            {item.first}
            {' '}
            and
            {' '}
            {item.second}
            {' '}
            is
            {' '}
            {item.result}
          </p>
        )
      }
    </Math>
    <Math first={4} second={5} operator="+">
      {
        (item) => (
          <Typography>
            When we add
            {' '}
            {item.first}
            {' '}
            with
            {' '}
            {item.second}
            {' '}
            then we will get
            {' '}
            {item.result}
            {' '}
            as result
          </Typography>
        )
      }
    </Math>
    <Math first={6} second={9} operator="*" />
  </>
);

export default ChildrenDemo;
