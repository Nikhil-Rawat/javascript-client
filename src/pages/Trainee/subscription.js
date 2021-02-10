import { gql } from '@apollo/client';

export const TRAINEE_ADDED = gql`subscription TraineeAdded {
  traineeAdded{
    status
    message
    data {
      name
      email
      originalId
      createdAt
    }
  }
}
`;

export const TRAINEE_UPDATED = gql`subscription TraineeUpdated {
  traineeUpdated{
   status
    message
    data {
      name
    }
  }
}
`;

export const TRAINEE_DELETED = gql`subscription TraineeDeleted {
  traineeDeleted{
    status
    message
  }
}
`;
