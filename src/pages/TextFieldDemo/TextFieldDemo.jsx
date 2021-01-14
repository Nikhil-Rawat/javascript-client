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
} from '../../config/constants';

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
      height={250}
      random
    />
    <p style={{ marginLeft: '10px' }}>
      <b>
        This is Disabled Input
      </b>
    </p>
    <TextField
      defaultValue="Default Value"
      disabled
    />
    <p style={{ marginLeft: '10px' }}>
      <b>
        This is Valid Input
      </b>
    </p>
    <TextField
      defaultValue="Default Value"
    />
    <p style={{ marginLeft: '10px' }}>
      <b>
        An Input with Error
      </b>
    </p>
    <TextField
      defaultValue="101"
      error
    />
    <p style={{ color: 'red', marginLeft: '10px' }}>Could not be greater than 100</p>
  </>
);

export default TextFieldDemo;
