import { gql } from 'apollo-angular';

const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    signUp(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      user {
        _id
        email
        firstName
        lastName
        locale
        createdAt
        updatedAt
      }
      token
    }
  }
`;
const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        _id
        email
        firstName
        lastName
        locale
        createdAt
        updatedAt
      }
      token
    }
  }
`;
export { SIGN_IN, SIGN_UP };
