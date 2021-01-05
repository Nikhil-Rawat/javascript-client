/* eslint-disable no-console */
import axios from 'axios';

export const callApi = async (state) => {
  await axios.post('http://localhost:9000/api/user/login', {
    email: state.Email,
    password: state.Password,
  })
    .then((response) => {
      localStorage.setItem('token', response.data.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
