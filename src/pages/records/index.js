import Image from "next/image";
import { useQuery } from "@apollo/client";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CashBanknote } from "tabler-icons-react";

import { Table, Select, Divider } from "@mantine/core";

import styles from "@/styles/Records.module.scss";

import InputValidator from "@/components/ImputValidator";
import Link from "next/link";
import NavBar from "@/components/Navbar";
import Record from "@/components/record";
import PublicModal from "@/components/PublicModal";

import { showAddCashAction } from "@/store/actions/modalActions";
import CashReseived from "@/components/CashReseived";
import { GET_BOXS } from "@/graphql/box";
import { GET_ROOMS } from "@/graphql/rooms";

export default function records() {
  const { showAdd } = useSelector((state) => state.modalReducer);

  const infoBoxs = useQuery(GET_BOXS);
  const boxs = infoBoxs.data;
  const { data, loading, error } = useQuery(GET_ROOMS);

  const [value, setValue] = useState();
  const [roomPlace, setRoomPlace] = useState();
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
    setRoomPlace(data.getRooms);
    dispatch(showAddCashAction());
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

  const handleClickSevgi = (event) => {
    event.preventDefault();
    setPlace("Sevgi");
    setRoomPlace([
      { _id: 101, roomNumer: "Familiar 101" },
      { _id: 201, roomNumer: "Triple Privada 201" },
      { _id: 202, roomNumer: "Triple Compartida 202" },
      { _id: 203, roomNumer: "Doble Compartida 203" },
    ]);
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
        <div className={styles.dataBoxs_info}>
          <label>
            Caja a utilizar
            {boxs.getBoxs && (
              <Select
                required
                maxDropdownHeight={380}
                icon={<CashBanknote size={14} />}
                value={value}
                onChange={setValue}
                placeholder="Caja"
                data={boxs.getBoxs.map((item) => ({
                  value: item._id,
                  label: `${item.nameBox}`,
                }))}
              />
            )}
          </label>
        </div>
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
          <CashReseived dataRoom={roomPlace} place={place} boxId={value} />
        </PublicModal>
      )}
    </main>
  );
}
