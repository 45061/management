import {
  LOGIN,
  SHOW_ADD_CASH,
  SHOW_WITHDRAW_CASH,
  SHOW_NEW_ROOM,
} from "../types";

const initialState = {
  showingLogin: false,
  showAdd: false,
  showWitdraw: false,
  showingNewRoom: false,
};

function modalReducer(state = initialState, action = null) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        showingLogin: !state.showingLogin,
      };
    case SHOW_ADD_CASH:
      return {
        ...state,
        showAdd: !state.showAdd,
      };
    case SHOW_WITHDRAW_CASH:
      return {
        ...state,
        showWitdraw: !state.showWitdraw,
      };
    case SHOW_NEW_ROOM:
      return {
        ...state,
        showingNewRoom: !state.showingNewRoom,
      };

    default:
      return state;
  }
}
export default modalReducer;
