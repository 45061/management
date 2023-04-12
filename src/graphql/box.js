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
      _id
      bank
      boxId {
        nameBox
      }
      cash
      concept
      place
      reasonOfPay
      roomId {
        roomNumer
      }
      timeTransaction
      typePayment
    }
  }
`;

export const POST_WHITDRAW = gql`
  mutation (
    $token: String
    $boxId: ID
    $concept: String
    $place: String
    $typeWithdraw: String
    $bank: String
    $reasonOfWithdraw: String
    $cash: String
    $who: String
    $timeTransaction: String
  ) {
    newWithdraw(
      token: $token
      boxId: $boxId
      concept: $concept
      place: $place
      typeWithdraw: $typeWithdraw
      bank: $bank
      reasonOfWithdraw: $reasonOfWithdraw
      cash: $cash
      who: $who
      timeTransaction: $timeTransaction
    ) {
      _id
      bank
      boxId {
        nameBox
      }
      cash
      concept
      place
      reasonOfWithdraw
      timeTransaction
      typeWithdraw
      userId {
        firstName
      }
      who
    }
  }
`;

export const POST_PERSONAL_INCOME = gql`
  mutation (
    $token: String
    $concept: String
    $place: String
    $typePayment: String
    $bank: String
    $boxId: ID
    $cash: String
    $timeTransaction: String
  ) {
    newPersonalIncome(
      token: $token
      concept: $concept
      place: $place
      typePayment: $typePayment
      bank: $bank
      boxId: $boxId
      cash: $cash
      timeTransaction: $timeTransaction
    ) {
      _id
      bank
      boxId {
        nameBox
      }
      cash
      concept
      place
      timeTransaction
      typePayment
      userId {
        firstName
      }
    }
  }
`;
