/* eslint-disable no-console */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import trainees from './data/trainee';
import { FormDialog } from './components';
import BasicTable from './components/Table/table';

const traineeList = (props) => {
  const { match, history } = props;
  const [state, setState] = useState({
    open: false,
  });

  const [order, setOrder] = useState('');

  const [orderBy, setOrderBy] = useState('');

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

  const handleSort = (event) => {
    setOrder(order === 'asc' && orderBy === event ? 'desc' : 'asc');
    setOrderBy(event);
  };

  const handleSelect = (event) => {
    history.push(`${match.path}/${event}`);
  };

  const getDateFormatted = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

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
      <BasicTable
        id="id"
        data={trainees}
        columns={[
          { field: 'name', label: 'NAME', align: 'center' },
          { field: 'email', label: 'EMAIL', format: (value) => value && value.toUpperCase() },
          {
            field: 'createdAt', label: 'CREATEDAT', align: 'right', format: getDateFormatted,
          },
        ]}
        orderBy={orderBy}
        order={order}
        onSort={handleSort}
        onSelect={handleSelect}
      />
    </>
  );
};

export default traineeList;
