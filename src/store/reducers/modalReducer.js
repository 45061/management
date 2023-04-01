import { LOGIN, SHOW_ADD_CASH, SHOW_WITHDRAW_CASH } from "../types";

const initialState = {
  showingLogin: false,
  showAdd: false,
  showWitdraw: false,
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

    default:
      return state;
  }
}
export default modalReducer;
