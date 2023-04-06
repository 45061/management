import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import Cookies from "universal-cookie";

import InputValidator from "./ImputValidator";
import styles from "../styles/components/Form.module.scss";
import { POST_ROOM_SEVGI } from "@/graphql/rooms";
import { showNewRoomAction } from "@/store/actions/modalActions";

function NewRoom() {
  const [newRoomSevgi] = useMutation(POST_ROOM_SEVGI);

  const [roomData, setRoomData] = useState({
    roomNumer: "",
    price: "",
  });
  const dispatch = useDispatch();

  const cookies = new Cookies();
  const token = cookies.get("myTokenName");

  const onChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await newRoomSevgi({
        variables: {
          token: token,
          roomNumer: roomData.roomNumer,
          price: roomData.price,
        },
      });
      if (data.newRoomSevgi._id) {
        dispatch(showNewRoomAction());
      }
    } catch (error) {
      console.log("este es el error", error);
    }

    // dispatch(postRoom(data));
  };

  return (
    <form className={styles.login}>
      <header className={styles.login__header}>
        <div className={styles.payment__brand}>
          <Image
            src="/imagen1.svg"
            alt="NominaApp Logo"
            width={150}
            height={150}
          />
          <Image
            src="/pago.png"
            alt="NominaApp Logo"
            width={150}
            height={150}
          />
        </div>
        <h3 className={styles.login__title}>
          {" "}
          Nu<span>e</span>v<span>a Hab</span>i<span>tac</span>i<span>ón</span>
        </h3>
      </header>
      <div className={styles.login__content}>
        <InputValidator
          name="roomNumer"
          id="roomNumer"
          value={roomData.title}
          type="text"
          classname={styles.login__input}
          placeholder="Numero de Room"
          onChange={onChange}
          errorMessage="El titulo es obligatorio"
        />
        <InputValidator
          name="price"
          id="price"
          value={roomData.price}
          type="text"
          classname={styles.login__input}
          placeholder="Precio"
          onChange={onChange}
        />
      </div>
      <div className={styles.payment__footer}>
        <button className={styles.btn_action} onClick={handleSubmit}>
          Crear
        </button>
      </div>
    </form>
  );
}

export default NewRoom;
