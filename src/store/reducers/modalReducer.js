import { LOGIN } from "../types";

const initialState = {
  showingLogin: false,
};

function modalReducer(state = initialState, action = null) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        showingLogin: !state.showingLogin,
      };

    default:
      return state;
  }
}
export default modalReducer;
