import { gql } from "@apollo/client";

export const POST_ROOM_SEVGI = gql`
  mutation ($token: String, $roomNumer: String, $price: String) {
    newRoomSevgi(token: $token, roomNumer: $roomNumer, price: $price) {
      _id
      roomNumer
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

export const GET_ROOMS_SEVGI = gql`
  query {
    getRoomsSevgi {
      _id
      roomNumer
    }
  }
`;
