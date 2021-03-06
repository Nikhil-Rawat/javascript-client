/* eslint-disable no-console */
import axios from 'axios';

export const callApi = async (request, state, params) => {
  const baseUrl = 'http://localhost:9000/api/';
  const Header = { Authorization: localStorage.getItem('token') };
  if (request === 'user/login') {
    try {
      const responseApi = await axios.post(`${baseUrl}${request}`, {
        email: state.Email,
        password: state.Password,
      });
      localStorage.setItem('token', responseApi.data.data);
      return responseApi;
    } catch (error) {
      if (error.message === 'Network Error') {
        return error.message;
      }
      return error.response.data.message;
    }
  }
  if (request === 'trainee/create') {
    try {
      const responseApi = await axios.post(`${baseUrl}${request}`, {
        name: state.Name,
        email: state.Email,
        password: state.Password,
        role: 'trainee',
        createdBy: 'admin',
      }, {
        headers: Header,
      });
      localStorage.setItem('status', responseApi.status);
      return responseApi;
    } catch (err) {
      localStorage.setItem('status', 'Error');
    }
  }
  if (request === 'trainee/getall') {
    try {
      const responseApi = await axios.get(`${baseUrl}${request}`, { headers: Header, params });
      return responseApi;
    } catch (err) {
      localStorage.removeItem('token');
      return err;
    }
  }
  if (request === 'trainee/update') {
    try {
      const responseApi = await axios.put(`${baseUrl}${request}`, {
        updatedBy: state.updatedBy,
        originalId: state.originalId,
        email: state.email,
        name: state.name,
      },
      { headers: Header });
      return responseApi;
    } catch (error) {
      return error;
    }
  }
  if (request === 'trainee/delete') {
    try {
      const responseApi = await axios.delete(`${baseUrl}${state}`,
        { headers: Header });
      return responseApi;
    } catch (error) {
      return error;
    }
  }
  return null;
};
