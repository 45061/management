import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getUsers: [User]!
  }
  type Mutation {
    login(email: String, password: String): Token
    getUser(token: String!): Token
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    typeUser: Boolean
  }
  type Token {
    token: String!
    user: User
  }
`;
