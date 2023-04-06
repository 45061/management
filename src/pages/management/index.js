import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery } from "@apollo/client";

import { GET_PAYMENT } from "@/graphql/box";

import { Table, Select, Divider } from "@mantine/core";

import styles from "@/styles/Management.module.scss";

import InputValidator from "@/components/ImputValidator";
import NavBar from "@/components/Navbar";
import PublicModal from "@/components/PublicModal";
import NewRoom from "@/components/NewRoom";
import { showNewRoomAction } from "@/store/actions/modalActions";

export default function management() {
  const { showingNewRoom } = useSelector((state) => state.modalReducer);

  const dispatch = useDispatch();

  const [value, setValue] = useState();
  const { data, loading, error } = useQuery(GET_PAYMENT);

  const largeScreen = useMediaQuery("(min-width: 1024px)");

  if (loading)
    return (
      <main className={styles.main}>
        <div className={styles.loading}>
          <h1>
            Load<span>in</span>g
          </h1>
          <Image
            src="/loading.png"
            alt="Ernesto Perez Loading"
            className={styles.vercelLogo}
            width={300}
            height={300}
            priority
          />
        </div>
      </main>
    );

  const handleClick = (event) => {
    event.preventDefault();
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

  const handleClick2 = (event) => {
    event.preventDefault();
    dispatch(showNewRoomAction());
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.dataWorkers__info}>
          <label>
            Día de Corte:{" "}
            <InputValidator
              name="firstDate"
              value={value}
              type="date"
              classname={styles.register__input}
              onChange={setValue}
              errorMessage="Nombre no debe estar vacio"
              required
            />
          </label>
          <div className={styles.data__buttonNewWorker}>
            <button onClick={handleClick}>Filtrar Día</button>
            <button onClick={handleClick2}>Nueva Habitación</button>
          </div>
        </div>
        <Divider />
        <div className={styles.tableOfWorkers}>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Dinero</th>
                <th>Raxon del pago</th>
                <th>Hora</th>
                <th>Tipo de pago</th>
                <th>Habitacion</th>
                <th>Usuario</th>
                <th>Caja</th>
              </tr>
            </thead>
            <tbody>
              {data.getPayment
                ?.map((element) => {
                  return (
                    <tr key={element._id}>
                      <td>{element.concept}</td>

                      <td>{element.cash}</td>

                      <td>{element.reasonOfPay}</td>

                      <td>{element.timeTransaction}</td>

                      <td>{element.typePayment} </td>

                      <td>{element.roomId.roomNumer}</td>

                      <td>{element.userId.firstName}</td>

                      <td>{element.boxId.nameBox}</td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </Table>
        </div>
      </div>
      <PublicModal
        opened={showingNewRoom}
        onClose={() => dispatch(showNewRoomAction())}
        size={largeScreen ? "40%" : "90%"}
      >
        <NewRoom />
      </PublicModal>
    </main>
  );
}
