import {
  LOGIN,
  SHOW_ADD_CASH,
  SHOW_WITHDRAW_CASH,
  SHOW_NEW_ROOM,
  SHOW_PERSONAL_INCOME,
  SHOW_PERSONAL_EXPENSE,
} from "../types";

const actionBody = (type, payload = null) => ({ type, payload });

export const showLogin = () => actionBody(LOGIN);
export const showAddCashAction = () => actionBody(SHOW_ADD_CASH);
export const showWithdrawCashAction = () => actionBody(SHOW_WITHDRAW_CASH);
export const showNewRoomAction = () => actionBody(SHOW_NEW_ROOM);
export const showPersonalIncome = () => actionBody(SHOW_PERSONAL_INCOME);
export const showPersonalExpense = () => actionBody(SHOW_PERSONAL_EXPENSE);
