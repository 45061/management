import { GET_ROOMS } from "@/graphql/box";
import { useQuery } from "@apollo/client";

import { Table, Select, Divider } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

import styles from "@/styles/Records.module.scss";
import Image from "next/image";
import InputValidator from "@/components/ImputValidator";
import Link from "next/link";
import NavBar from "@/components/Navbar";
import Record from "@/components/record";
import PublicModal from "@/components/PublicModal";
import { showAddCashAction } from "@/store/actions/modalActions";
import { useDispatch, useSelector } from "react-redux";
import CashReseived from "@/components/CashReseived";

export default function records() {
  const { showWitdraw, showAdd } = useSelector((state) => state.modalReducer);

  const { data, loading, error } = useQuery(GET_ROOMS);

  const [value, setValue] = useState();
  const [place, setPlace] = useState();
  const largeScreen = useMediaQuery("(min-width: 1024px)");
  const dispatch = useDispatch();

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

  const handleClickOporto = (event) => {
    event.preventDefault();
    setPlace("Oporto");
    dispatch(showAddCashAction());
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

  const handleClickSevgi = (event) => {
    event.preventDefault();
    setPlace("Sevgi");
    dispatch(showAddCashAction());
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

  const handleClickPersonal = (event) => {
    event.preventDefault();
    setPlace("Personal");
    dispatch(showAddCashAction());
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.dataWorkers__info}>
          <Record
            label="Oporto 83"
            handleClick1={handleClickOporto}
            handleClick2={handleClickOporto}
          />
          <Record
            label="Sevgi Sense Hostal"
            handleClick1={handleClickSevgi}
            handleClick2={handleClickSevgi}
          />
          <Record
            label="Movimientos Personales"
            handleClick1={handleClickPersonal}
            handleClick2={handleClickPersonal}
          />
        </div>
        <Divider />
      </div>
      {data.getRooms && (
        <PublicModal
          opened={showAdd}
          onClose={() => dispatch(showAddCashAction())}
          size={largeScreen ? "35%" : "90%"}
        >
          <CashReseived dataRoom={data.getRooms} place={place} />
        </PublicModal>
      )}
    </main>
  );
}
