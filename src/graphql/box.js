import { gql } from "@apollo/client";

export const GET_PAYMENT = gql`
  query {
    getPayment {
      _id
      concept
      cash
      reasonOfPay
      timeTransaction
      typePayment

      roomId {
        roomNumer
      }
      userId {
        firstName
        lastName
      }
      boxId {
        nameBox
      }
    }
  }
`;

export const GET_ROOMS = gql`
  query {
    getRooms {
      _id
      roomNumer
    }
  }
`;
