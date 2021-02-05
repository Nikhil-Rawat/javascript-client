/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, CssBaseline } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useQuery, useMutation } from '@apollo/react-hoc';
import moment from 'moment';
import { FormDialog, EditDialog, DeleteDialog } from './components';
import { BasicTable } from '../../components';
import { SnackbarContext } from '../../contexts';
import { WithLoaderAndMessage } from '../../components/HOC';
import { GETALL_TRAINEE } from './query';
import { CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE } from './mutation';
import { SUCCESS, APOLLO_UNDER_MAINTANCE, ERROR } from '../../config/constants';

const TraineeList = (props) => {
  const { match, history } = props;
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [order, setOrder] = useState();
  const [orderBy, setOrderBy] = useState();
  const [page, setPage] = useState(0);
  const [details, setDetails] = useState({});
  const [records, setRecords] = useState({ TraineeArray: [], TotalCount: 0 });
  const [loading, setLoading] = useState(true);
  const { refetch } = useQuery(GETALL_TRAINEE);
  const [createTrainee] = useMutation(CREATE_TRAINEE);
  const [updateTrainee] = useMutation(UPDATE_TRAINEE);
  const [deleteTrainee] = useMutation(DELETE_TRAINEE);

  const EnhanchedTable = WithLoaderAndMessage(BasicTable);

  const handleSort = (property) => {
    setOrder(order === 'asc' && orderBy === property ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelect = (property) => {
    history.push(`${match.path}/${property}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSubmit = async (openSnackbar, state) => {
    try {
      setLoading(true);
      const response = await createTrainee({
        variables:
        {
          name: state.Name, email: state.Email, password: state.Password, role: 'trainee',
        },
      });
      if (response.data.createTrainee.status === 200) {
        openSnackbar(SUCCESS, response.data.createTrainee.message);
        setOpen(false);
        setLoading(false);
      } else {
        openSnackbar(ERROR, response.data.createTrainee.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      openSnackbar(ERROR, APOLLO_UNDER_MAINTANCE);
    }
  };

  const getDateFormatted = (date) => moment(date).format('dddd, MMMM Do yyyy, hh:mm:ss a');

  const handleEditDialogOpen = (traineeDetails) => {
    setEditOpen(true);
    setDetails(traineeDetails);
  };

  const handleDeleteDialogOpen = (traineeDetails) => {
    setDeleteOpen(true);
    setDetails(traineeDetails);
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
  };

  const handleEditDialogSubmit = async (openSnackbar, state) => {
    try {
      setLoading(true);
      const ServerResponse = await updateTrainee({
        variables:
        { name: state.Name, email: state.Email, originalId: details.originalId },
      });
      if (ServerResponse.data.updateTrainee.status === 200) {
        openSnackbar(SUCCESS, ServerResponse.data.updateTrainee.message);
        setEditOpen(false);
        setLoading(false);
      } else {
        openSnackbar(ERROR, ServerResponse.data.updateTrainee.message);
        setLoading(false);
      }
    } catch (error) {
      openSnackbar(ERROR, APOLLO_UNDER_MAINTANCE);
    }
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDelete = async (openSnackbar) => {
    try {
      setLoading(true);
      if (details.createdAt >= '2019-02-14') {
        const ServerResponse = await deleteTrainee({ variables: { id: details.originalId } });
        if (ServerResponse.data.deleteTrainee.status === 200) {
          openSnackbar(SUCCESS, ServerResponse.data.deleteTrainee.message);
          setLoading(false);
        } else {
          openSnackbar(ERROR, ServerResponse.data.deleteTrainee.message);
          setLoading(false);
        }
        if (page > 0 && records.TraineeArray.length === 1) {
          setPage(page - 1);
        }
      } else {
        openSnackbar(ERROR, 'Trainee cannot be Deleted');
        setLoading(false);
      }
      setDeleteOpen(false);
    } catch (error) {
      openSnackbar(ERROR, APOLLO_UNDER_MAINTANCE);
      setLoading(false);
      setDeleteOpen(false);
    }
  };

  const handleTableData = async () => {
    try {
      const response = await refetch({ skip: page * 5, limit: 5 });
      let TraineeData = [];
      let totalcount = 0;
      if (response.data.getAllTrainee.status === 200) {
        TraineeData = response.data.getAllTrainee.data.records;
        totalcount = response.data.getAllTrainee.data.Total_Count;
        localStorage.setItem('detailsData', JSON.stringify(TraineeData));
        setRecords({ TraineeArray: TraineeData, TotalCount: totalcount });
        setLoading(false);
      } else {
        setLoading(false);
        setRecords({ TraineeArray: [] });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleTableData();
  }, [open, page, loading]);

  return (
    <SnackbarContext.Consumer>
      {({ openSnackbar }) => (
        <>
          <CssBaseline />
          <Button size="large" variant="outlined" color="primary" onClick={handleClickOpen} style={{ marginLeft: '10px' }}>
            Add Trainee
          </Button>
          <EnhanchedTable
            id="originalId"
            data={records.TraineeArray}
            loader={loading}
            disabled={loading}
            dataLength={records.TotalCount}
            columns={[
              {
                field: 'name',
                label: 'Name',
              },
              {
                field: 'email',
                label: 'Email Address',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: getDateFormatted,
              },
            ]}
            actions={[
              {
                icon: <EditIcon />,
                handler: handleEditDialogOpen,
              },
              {
                icon: <DeleteIcon />,
                handler: handleDeleteDialogOpen,
              },
            ]}
            order={order}
            orderBy={orderBy}
            onSort={handleSort}
            onSelect={handleSelect}
            page={page}
            onChangePage={handleChangePage}
            count={records.TotalCount}
            rowsPerPage={5}
          />
          <FormDialog
            loading={loading}
            open={open}
            onClose={handleClose}
            onSubmit={(state) => handleSubmit(openSnackbar, state)}
          />
          <EditDialog
            loading={loading}
            open={editOpen}
            onClose={handleEditDialogClose}
            onSubmit={(state) => handleEditDialogSubmit(openSnackbar, state)}
            defaultValues={details}
          />
          <DeleteDialog
            loading={loading}
            open={deleteOpen}
            onClose={handleDeleteClose}
            onDelete={() => handleDelete(openSnackbar)}
          />
        </>
      )}
    </SnackbarContext.Consumer>
  );
};

TraineeList.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
export default TraineeList;
