import Image from "next/image";
import { useState } from "react";
import styles from "../styles/components/Login.module.scss";
import { useMutation } from "@apollo/client";
import Cookies from "universal-cookie";

import { POST_LOGIN } from "@/graphql/user";

import { useDispatch } from "react-redux";

// import axios from "axios";
import Link from "next/link";
import { showLogin } from "@/store/actions/modalActions";
import { loginUser } from "@/store/actions/authAction";
// import { login } from "@/store/actions/authAction";

export default function Login() {
  const dispatch = useDispatch();
  const [login] = useMutation(POST_LOGIN);
  const cookies = new Cookies();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: {
          email: loginData.email,
          password: loginData.password,
        },
      });
      if (data.login.token) {
        cookies.set("myTokenName", data.login.token, {
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 9,
          path: "/",
        });
        dispatch(loginUser(data.login.user));
      }
    } catch {
      console.log("hay un errror en login");
    }

    // dispatch(login(loginData));
  };

  return (
    <form className={styles.login}>
      <header className={styles.login__header}>
        <div className={styles.login__brand}>
          <Image
            src="/pago.png"
            alt="NominaApp Logo"
            width={150}
            height={150}
          />
          <Image
            src="/imagen1.svg"
            alt="NominaApp Logo"
            width={150}
            height={150}
          />
        </div>
        <h3 className={styles.login__title}>
          {" "}
          Ini<span>c</span>i<span>ar</span> <span>Ses</span>i<span>ó</span>n
        </h3>
      </header>
      <div className={styles.login__content}>
        {/* Email */}
        <input
          name="email"
          type="email"
          value={loginData.name}
          onChange={onChange}
          className={styles.login__input}
          placeholder="email"
          errormessage="EL correo es requerido."
          required
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          value={loginData.name}
          onChange={onChange}
          className={styles.login__input}
          placeholder="Contraseña"
          errormessage="Minimo 8 caracteres e incluir 1 numero y 1 caracter especial"
          pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
          required
        />
      </div>
      <div className={styles.login__footer}>
        <button
          className={styles.btn_action}
          type="submit"
          onClick={handleSubmit}
        >
          Acceder
        </button>
      </div>
    </form>
  );
}
