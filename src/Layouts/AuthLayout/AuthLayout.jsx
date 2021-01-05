import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';
import { FormDialog } from '../../pages';

const AuthLayout = ({ history }) => (
  <>
    <FormDialog history={history} />
    <br />
    <Footer />
  </>
);

AuthLayout.propTypes = {
  history: PropTypes.object.isRequired,
};

export default AuthLayout;
