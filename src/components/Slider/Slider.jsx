/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getNextRoundRobin, getRandomNumber } from '../libs/utils';
import stylesheet from './style';

const Slider = (props) => {
  const [count, setCount] = useState(0);
  const {
    altText, banners, defaultBanner, duration, height, random,
  } = props;
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCount = count + 1;
      setCount(updatedCount);
    }, duration);
    return () => clearInterval(interval);
  }, [count]);
  let index;
  if (random) {
    index = getRandomNumber(5);
  } else {
    index = getNextRoundRobin(5, count);
  }
  return (
    <>
      <img
        src={banners[index] || defaultBanner}
        alt={altText}
        height={height}
        style={stylesheet.image}
      />
    </>
  );
};

Slider.defaultProps = {
  altText: 'Default Banner',
  defaultBanner: './images/default.png',
  duration: 2000,
  height: 200,
  random: false,
};

Slider.propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.array.isRequired,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

export default Slider;
