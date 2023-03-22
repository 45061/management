import { LOGIN } from "../types";

const actionBody = (type, payload = null) => ({ type, payload });

export const showLogin = () => actionBody(LOGIN);
