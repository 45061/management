/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import Cookies from "universal-cookie";
import Router from "next/router";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { POST_LOGIN } from "@/graphql/user";

// import { toast } from "react-toastify";
// import { hiddeLoginNav, hiddeRegisterForm } from "./modalAction";
import { AUTH_SUCCESS, AUTH_ERROR, LOGOUT, USER_SUCCESS } from "../types";
import { showLogin } from "./modalActions";

export const logout = () => async (dispatch) => {
  Router.push("/");
  const cookies = new Cookies();
  cookies.remove("myTokenName");
  // toast.success("Logout con exito");
  dispatch({ type: LOGOUT });
};

export const loginUser = (body) => async (dispatch) => {
  try {
    dispatch({ type: USER_SUCCESS, payload: body });
    dispatch(showLogin());

    // dispatch(hiddeLoginNav());
    // toast.success("Usuario ha realizado login con exito");
    // dispatch({ type: AUTH_SUCCESS, payload: response.user });
  } catch (error) {
    console.log("hay un errror en login");
    // dispatch({ type: AUTH_ERROR, payload: error });
    // toast.error("Usuario o contraseña errada");
  }
};

// export const getUserData = (token) => async (dispatch) => {
//   try {
//     const response = await axios.get("/api/user/profile");
//     if (response.status === 100) {
//     }
//     dispatch({ type: USER_SUCCESS, payload: response.data.user });
//   } catch (error) {
//     console.log("error en la solicitud de datos del usuario GetUerData");
//     dispatch({ type: AUTH_ERROR, payload: error.response });
//   }
// };

export const getUerData = (token) => async (dispatch) => {
  try {
    const response = await axios.get("/api/user/signup", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const { data } = response;
    console.log("esto es data en store", data);
    dispatch({ type: USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: error.response });
  }
};
