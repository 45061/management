import { useState } from "react";
import { useDispatch } from "react-redux";

import InputValidator from "./ImputValidator";
import styles from "../styles/components/Form.module.scss";

function NewRoom() {
  const [roomData, setRoomData] = useState({
    roomNumer: "",
    price: "",
  });
  const dispatch = useDispatch();

  const onChange = (e) => {
    setRoomData({
      ...roomData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      roomNumer: roomData.roomNumer,
      price: roomData.price,
    };

    // dispatch(postRoom(data));
  };

  return (
    <form className={styles.image_upload_form}>
      <header className={styles.image_upload_form__header}>
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
        <h3 className={styles.login__title}> Nueva Habitación</h3>
      </header>
      <div className="videoform__content">
        <InputValidator
          name="roomNumer"
          id="roomNumer"
          value={roomData.title}
          type="text"
          classname={styles.image_upload_form__input}
          placeholder="Numero de Room"
          onChange={onChange}
          errorMessage="El titulo es obligatorio"
        />
        <InputValidator
          name="price"
          id="price"
          value={roomData.price}
          type="text"
          classname={styles.image_upload_form__input}
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
