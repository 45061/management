/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import Router from "next/router";
import axios from "axios";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { POST_LOGIN } from "@/graphql/user";

// import { toast } from "react-toastify";
// import { hiddeLoginNav, hiddeRegisterForm } from "./modalAction";
import { AUTH_SUCCESS, AUTH_ERROR, LOGOUT, USER_SUCCESS } from "../types";

// export const logout = () => async (dispatch) => {
//   Router.push("/");
//   const response = await axios.post("/api/user/logout");
//   toast.success("Logout con exito");
//   dispatch({ type: LOGOUT });
// };

export const loginUser = (body) => async (dispatch) => {
  const [login] = useMutation(POST_LOGIN);

  try {
    const { email, password } = body;

    // const response = await axios.post("/api/user/login", body);
    const { data } = await login({
      variables: {
        email,
        password,
      },
    });
    console.log("esto es la data en el store2", data);

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
