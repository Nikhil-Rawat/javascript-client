import React from 'react';
import { Slider, TextField } from '../../components';
import {
  PUBLIC_IMAGE_FOLDER,
  DEFAULT_BANNER_IMAGE,
  CLOUD_IMAGE,
  DNS_SERVER_IMAGE,
  FULL_STACK_IMAGE,
  JS_IMAGE,
  LOAD_BALANCER_IMAGE,
} from '../../config/index';

const TextFieldDemo = () => (
  <>
    <Slider
      banners={[PUBLIC_IMAGE_FOLDER + CLOUD_IMAGE,
        PUBLIC_IMAGE_FOLDER + DEFAULT_BANNER_IMAGE,
        PUBLIC_IMAGE_FOLDER + DNS_SERVER_IMAGE,
        PUBLIC_IMAGE_FOLDER + FULL_STACK_IMAGE,
        PUBLIC_IMAGE_FOLDER + JS_IMAGE,
        PUBLIC_IMAGE_FOLDER + LOAD_BALANCER_IMAGE,
      ]}
      height={300}
      random
    />
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
