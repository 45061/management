import { GET_PAYMENT } from "@/graphql/box";
import { useQuery } from "@apollo/client";

import { Table, Select, Divider } from "@mantine/core";
import { useState } from "react";

import styles from "@/styles/Records.module.scss";
import Image from "next/image";
import InputValidator from "@/components/ImputValidator";
import Link from "next/link";
import NavBar from "@/components/Navbar";

export default function records() {
  const [value, setValue] = useState();
  // const { data, loading, error } = useQuery(GET_PAYMENT);

  // if (loading)
  //   return (
  //     <main className={styles.main}>
  //       <div className={styles.loading}>
  //         <h1>
  //           Load<span>in</span>g
  //         </h1>
  //         <Image
  //           src="/loading.png"
  //           alt="Ernesto Perez Loading"
  //           className={styles.vercelLogo}
  //           width={300}
  //           height={300}
  //           priority
  //         />
  //       </div>
  //     </main>
  //   );

  const handleClick = (event) => {
    event.preventDefault();
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };
  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.dataWorkers__info}>
          <label>
            Oporto 83:{" "}
            <div className={styles.data__buttonNewWorker}>
              <button
                className={styles.buttonNewWorker__buton1}
                onClick={handleClick}
              >
                Nuevo Retiro
              </button>
              <button
                className={styles.buttonNewWorker__buton2}
                onClick={handleClick}
              >
                Nuevo Ingreso
              </button>
            </div>
          </label>
          <label>
            Sevgi Sense Hostal:{" "}
            <div className={styles.data__buttonNewWorker}>
              <button
                className={styles.buttonNewWorker__buton1}
                onClick={handleClick}
              >
                Nuevo Retiro
              </button>
              <button
                className={styles.buttonNewWorker__buton2}
                onClick={handleClick}
              >
                Nuevo Ingreso
              </button>
            </div>
          </label>
          <label>
            Movimientos Personales:{" "}
            <div className={styles.data__buttonNewWorker}>
              <button
                className={styles.buttonNewWorker__buton1}
                onClick={handleClick}
              >
                Nuevo Retiro
              </button>
              <button
                className={styles.buttonNewWorker__buton2}
                onClick={handleClick}
              >
                Nuevo Ingreso
              </button>
            </div>
          </label>
        </div>
        <Divider />
      </div>
    </main>
  );
}
