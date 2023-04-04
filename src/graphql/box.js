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

export const GET_BOXS = gql`
  query {
    getBoxs {
      _id
      nameBox
    }
  }
`;

export const POST_PAY = gql`
  mutation (
    $token: String
    $concept: String
    $place: String
    $typePayment: String
    $bank: String
    $reasonOfPay: String
    $roomId: ID
    $boxId: ID
    $cash: String
    $timeTransaction: String
  ) {
    newPayment(
      token: $token
      concept: $concept
      place: $place
      typePayment: $typePayment
      bank: $bank
      reasonOfPay: $reasonOfPay
      roomId: $roomId
      boxId: $boxId
      cash: $cash
      timeTransaction: $timeTransaction
    ) {
      firstName
      lastName
    }
  }
`;
