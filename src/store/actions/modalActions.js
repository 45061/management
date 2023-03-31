import { LOGIN, SHOW_ADD_CASH, SHOW_WITHDRAW_CASH } from "../types";

const actionBody = (type, payload = null) => ({ type, payload });

export const showLogin = () => actionBody(LOGIN);
export const showAddCashAction = () => actionBody(SHOW_ADD_CASH);
export const showWithdrawCashAction = () => actionBody(SHOW_WITHDRAW_CASH);
