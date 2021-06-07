import { gql } from '@apollo/client';

const CREATE_TRAINEE = gql`mutation createTrainee($name: String!, $email: String!, $password: String!, $role: String!) {
  createTrainee(user: { name: $name, email: $email, password: $password, role: $role }) {
    status
    message
    data {
      name
      email
      originalId
      createdAt
    }
  }
}`;

const UPDATE_TRAINEE = gql`mutation updateTrainee($name: String!, $email: String!, $originalId: ID!) {
  updateTrainee(updatedPayload: { name: $name, email: $email, originalId: $originalId }) {
    status
    message
  }
}`;

const DELETE_TRAINEE = gql`mutation deleteTrainee($id: String!) {
  deleteTrainee(id: $id ) {
    status
    message
  }
}`;

export {
  CREATE_TRAINEE, UPDATE_TRAINEE, DELETE_TRAINEE,
};
