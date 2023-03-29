import { gql } from "@apollo/client";

export const GET_PAYMENT = gql`
  query {
    getPayment {
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
