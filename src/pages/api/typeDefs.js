import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getUsers: [User]!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    numer: String!
    typeUser: Boolean
  }
`;
