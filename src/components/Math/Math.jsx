/* eslint-disable no-eval */
import { func, number } from 'prop-types';
import React from 'react';
import { string } from 'yup/lib/locale';

const Math = (props) => {
  const getResult = (first, second, operator) => {
    const operators = ['+', '-', '/', '*'];
    let result;
    if (!operators.includes(operator)) {
      result = 'Invalid Operators';
    } else if (operator === '/' && second === 0) {
      result = 'Infinity';
    } else result = eval(`${first} ${operator} ${second}`);
    return result;
  };
  const {
    first, second, operator, children,
  } = props;
  if (children) {
    return children({ first, second, result: getResult(first, second, operator) });
  }
  return (
    <p>
      Result of
      {' '}
      {first}
      {' '}
      and
      {' '}
      {second}
      {' '}
      is
      {' '}
      {getResult(first, second, operator)}
    </p>
  );
};

Math.defaultProps = {
  children: null,
};

Math.propTypes = {
  first: number.isRequired,
  second: number.isRequired,
  operator: string.isRequired,
  children: func,
};

export default Math;
