/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Cash, CashBanknote } from "tabler-icons-react";
import { Select } from "@mantine/core";
import dayjs from "dayjs";
import Cookies from "universal-cookie";

import InputValidator from "./ImputValidator";

import styles from "../styles/components/Form.module.scss";
import Image from "next/image";
// import { withdrawBox } from "../../store/actions/boxAction";

function CashWithdrawed({ boxId, place }) {
  const [payment, setPayment] = useState("");
  const [paymentBy, setPaymentBy] = useState("react");
  const [bank, setBank] = useState(false);
  const [theBank, setTheBank] = useState("N/A");

  const cookies = new Cookies();
  const token = cookies.get("myTokenName");

  const thisDay = dayjs().$d.toString().substr(0, 24);
  const [cash, setcash] = useState({
    place: place,
    concept: "",
    cash: "",
    typeWithdraw: "",
    reasonOfWithdraw: "",
    bank: "",
    boxId: "",
    who: "",
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setcash({
      ...cash,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    cash.reasonOfWithdraw = paymentBy;
    cash.boxId = boxId;
    cash.timeTransaction = thisDay;
    cash.typeWithdraw = payment;
    cash.bank = theBank;
    // dispatch(withdrawBox(cash));
  };

  useEffect(() => {
    if (payment === "TransferenciaBanco" || payment === "PSE") {
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
              src="/imagen1.svg"
              alt="NominaApp Logo"
              width={150}
              height={150}
            />
            <Image
              src="/sacando.png"
              alt="NominaApp Logo"
              width={150}
              height={150}
            />
          </div>
          <h3 className={styles.login__title}>
            {" "}
            Re<span>al</span>i<span>zar</span> Re<span>t</span>ir<span>o</span>
          </h3>
        </header>
        <div className="videoform__content">
          <Select
            required
            maxDropdownHeight={380}
            icon={<CashBanknote size={14} />}
            value={paymentBy}
            onChange={setPaymentBy}
            label="Motivo del Retiro"
            placeholder="Retiro por"
            data={[
              {
                value: "Cafeteria",
                label: "Cafeteria",
              },
              {
                value: "Turnos",
                label: "Turnos",
              },
              {
                value: "Retiro",
                label: "Retiro Caja",
              },
              {
                value: "Salario",
                label: "Salarios",
              },
              {
                value: "Aseo",
                label: "Aseo",
              },
              {
                value: "Otros",
                label: "Otros",
              },
            ]}
          />
          <Select
            required
            maxDropdownHeight={380}
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
                value: "PSE",
                label: "PSE",
              },
              {
                value: "TransferenciaNequi",
                label: "Transferencia Nequi",
              },
              {
                value: "TransferenciaBanco",
                label: "Transferencia Banco",
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
            name="who"
            id="cash"
            value={cash.who}
            type="number"
            classname={styles.login__input2}
            placeholder="Aquien se paga"
            onChange={onChange}
          />
          <InputValidator
            name="cash"
            id="cash"
            value={cash.cash}
            type="number"
            classname={styles.login__input2}
            placeholder="Dinero a Retirar"
            onChange={onChange}
          />
        </div>
        <div className={styles.payment__footer}>
          <button className={styles.btn_action} onClick={handleSubmit}>
            Retirar Dinero
          </button>
        </div>
      </form>
    </div>
  );
}

export default CashWithdrawed;
