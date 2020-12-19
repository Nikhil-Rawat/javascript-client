/* eslint-disable no-console */
import React from 'react';
import Button from '@material-ui/core/Button';
import { FormDialog } from './components';

class Trainee extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (state) => {
    this.setState({ open: false });
    console.log(state);
  }

  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          Add Trainee
        </Button>
        <FormDialog
          open={open}
          onClose={this.handleClose}
          onSubmit={this.handleSubmit}
        />
      </>
    );
  }
}

export default Trainee;
