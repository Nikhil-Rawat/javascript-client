/* eslint-disable no-eval */
import React from 'react';
import { string, number, func } from 'prop-types';

const getResult = (first, second, operator) => {
  let result;
  const operatorList = ['+', '-', '/', '*'];
  if (operator === '/' && second === 0) {
    result = 'Infinity';
  }

  if (!operatorList.includes(operator)) {
    result = 'Invalid Operator';
  }

  if (operatorList.includes(operator)) {
    result = eval(`${first} ${operator} ${second}`);
  }
  return result;
};

const Math = (props) => {
  const {
    first, second, operator, children,
  } = props;

  if (children) {
    return children(
      first, second, getResult(first, second, operator),
    );
  }
  return (
    <p>
      {first}
      {' '}
      {operator}
      {' '}
      {second}
      {' '}
      =
      {' '}
      {getResult(first, second, operator)}
    </p>
  );
};

Math.propTypes = {
  first: number.isRequired,
  second: number.isRequired,
  operator: string.isRequired,
  children: func,
};

Math.defaultProps = {
  children: null,
};

export default Math;
