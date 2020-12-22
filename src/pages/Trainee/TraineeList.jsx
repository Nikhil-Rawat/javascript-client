/* eslint-disable no-console */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import trainees from './data/trainee';
import { FormDialog } from './components';

const traineeList = () => {
  const [state, setState] = useState({
    open: false,
  });

  const handleClickOpen = () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const handleSubmit = (event) => {
    setState({ open: false });
    console.log(event);
  };
  const { open } = state;
  return (

    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Trainee
      </Button>
      <FormDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <ul>
        {
          trainees.map(({ name, id }) => (
            <li key={name}>
              <Link to={`/trainee/${id}`}>
                {name}
              </Link>
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default traineeList;
