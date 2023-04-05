import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getUsers: [User]!
    getPayment: [Payment]!
    getRooms: [Room]!
    getBoxs: [Box]!
    getRoomsSevgi: [RoomSevgi]!
  }
  type Mutation {
    login(email: String, password: String): Token
    getUser(token: String!): Token
    newRoomSevgi(token: String, roomNumer: String, price: String): RoomSevgi
    newPayment(
      token: String
      concept: String
      place: String
      typePayment: String
      bank: String
      reasonOfPay: String
      roomId: ID
      boxId: ID
      cash: String
      timeTransaction: String
    ): Payment
    newWithdraw(
      token: String
      concept: String
      place: String
      typeWithdraw: String
      bank: String
      reasonOfWithdraw: String
      boxId: ID
      cash: String
      who: String
      timeTransaction: String
    ): Withdraw
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
    _id: ID
    userId: User
    concept: String
    place: String
    typePayment: String
    bank: String
    reasonOfPay: String
    roomId: Room
    boxId: Box
    cash: String
    timeTransaction: String
  }
  type Withdraw {
    _id: ID
    userId: User
    concept: String
    place: String
    typeWithdraw: String
    bank: String
    reasonOfWithdraw: String
    boxId: Box
    cash: String
    who: String
    timeTransaction: String
  }
  type Room {
    _id: ID
    roomNumer: String
  }
  type Box {
    _id: ID
    nameBox: String
  }
  type RoomSevgi {
    _id: ID
    roomNumer: String
  }
`;
