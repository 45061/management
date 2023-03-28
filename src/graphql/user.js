import { gql } from "@apollo/client";

export const POST_LOGIN = gql`
  mutation ($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        firstName
        lastName
        typeUser
      }
    }
  }
`;

export const GET_USER = gql`
  mutation ($token: String!) {
    getUser(token: $token) {
      token
      user {
        _id
        email
        firstName
        lastName
      }
    }
  }
`;
