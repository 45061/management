import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getUsers: [User]!
    getPayment: [Payment]!
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
  type Payment {
    userId: User
    concept: String
    typePayment: String
    reasonOfPay: String
    roomId: Room
    boxId: Box
    cash: Float
    timeTransaction: String
  }
  type Room {
    roomNumer: String
  }
  type Box {
    nameBox: String
  }
`;
