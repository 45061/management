/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Cash, Bed, CashBanknote } from "tabler-icons-react";
import { Select } from "@mantine/core";
import dayjs from "dayjs";
import Cookies from "universal-cookie";

import InputValidator from "./ImputValidator";

import styles from "../styles/components/Form.module.scss";
import Image from "next/image";
import { GET_PAYMENT, POST_PAY } from "@/graphql/box";
import { useMutation } from "@apollo/client";
import { showAddCashAction } from "@/store/actions/modalActions";
// import { paymentBox } from "../../store/actions/boxAction";

function CashReseived({ dataRoom, boxId, place }) {
  const [payment, setPayment] = useState("");
  const [room, setRoom] = useState("");
  const [paymentBy, setPaymentBy] = useState("react");
  const [bank, setBank] = useState(false);
  const [theBank, setTheBank] = useState("N/A");

  const [newPayment] = useMutation(POST_PAY, {
    refetchQueries: [{ query: GET_PAYMENT }, "GetPayments"],
  });

  const cookies = new Cookies();
  const token = cookies.get("myTokenName");

  const [cash, setcash] = useState({
    place: place,
    concept: "",
    cash: "",
    typePayment: "",
    bank: "N/A",
    roomId: "",
    reasonOfPay: "",
    boxId: "",
    timeTransaction: "",
  });

  const thisDay = dayjs().$d.toString().substr(0, 24);

  const dispatch = useDispatch();

  const onChange = (e) => {
    setcash({
      ...cash,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    cash.bank = theBank;
    try {
      const { data } = await newPayment({
        variables: {
          token: token,
          concept: cash.concept,
          place: place,
          typePayment: payment,
          bank: cash.bank,
          reasonOfPay: paymentBy,
          roomId: room,
          boxId: boxId,
          cash: cash.cash,
          timeTransaction: thisDay,
        },
      });
      if (data.newPayment._id) {
        dispatch(showAddCashAction());
      }
    } catch (error) {
      console.log("este es el error", error);
    }

    // dispatch(paymentBox(cash));
  };

  useEffect(() => {
    if (payment === "TransferenciaBanco") {
      setBank(true);
      console.log("es real", bank);
    } else {
      setBank(false);
      console.log("es falso", bank);
    }
  }, [payment]);

  return (
    <div>
      <form className={styles.payment}>
        <header className={styles.payment__header}>
          <div className={styles.payment__brand}>
            <Image
              src="/imagen1.png"
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
            Re<span>al</span>i<span>zar</span> <span>P</span>ag<span>o</span>
          </h3>
        </header>
        <Select
          required
          icon={<Cash size={14} />}
          value={payment}
          onChange={setPayment}
          label="Selecciona el metodo de pago"
          placeholder="Metodo de pago"
          data={[
            {
              value: "Efectivo",
              label: "Efectivo",
            },
            {
              value: "Datafono",
              label: "Datafono",
            },
            {
              value: "TransferenciaNequi",
              label: "Transferencia Nequi",
            },
            {
              value: "TransferenciaBanco",
              label: "Transferencia Banco",
            },
            {
              value: "AirBnb",
              label: "AirBnb",
            },
          ]}
        />
        {bank ? (
          <Select
            required
            maxDropdownHeight={380}
            icon={<Cash size={14} />}
            value={theBank}
            onChange={setTheBank}
            label="Banco"
            placeholder="Que Banco"
            data={[
              {
                value: "Davivienda",
                label: "Davivienda",
              },
              {
                value: "Bancolombia",
                label: "Bancolombia",
              },
            ]}
          />
        ) : (
          <></>
        )}
        <Select
          required
          maxDropdownHeight={380}
          icon={<Bed size={14} />}
          value={room}
          onChange={setRoom}
          label="Habitacion del pago"
          placeholder="Habitación"
          data={dataRoom.map((item) => ({
            value: item._id,
            label: `${item.roomNumer}`,
          }))}
        />
        <Select
          required
          maxDropdownHeight={380}
          icon={<CashBanknote size={14} />}
          value={paymentBy}
          onChange={setPaymentBy}
          label="Motivo del Pago"
          placeholder="Pago por"
          data={[
            {
              value: "Consumibles",
              label: "Pago Consumibles",
            },
            {
              value: "Habitacion",
              label: "Pago Habitacion",
            },
            {
              value: "Inyeccion",
              label: "Inyeccion Efectivo Caja",
            },
          ]}
        />
        <InputValidator
          name="concept"
          id="concept"
          value={cash.concept}
          type="text"
          classname={styles.login__input2}
          placeholder="Concepto"
          onChange={onChange}
          errorMessage="El titulo es obligatorio "
          required
        />
        <InputValidator
          name="cash"
          id="cash"
          value={cash.cash}
          type="number"
          classname={styles.login__input2}
          placeholder="Dinero a Agregar"
          onChange={onChange}
        />
        <div className={styles.payment__footer}>
          <button
            disabled={!boxId}
            className={styles.btn_action}
            type="submit"
            onClick={handleSubmit}
          >
            Añadir Dinero
          </button>
        </div>
      </form>
    </div>
  );
}

export default CashReseived;
