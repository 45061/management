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

import {
  showAddCashAction,
  showPersonalExpense,
  showPersonalIncome,
  showWithdrawCashAction,
} from "@/store/actions/modalActions";
import CashReseived from "@/components/CashReseived";
import { GET_BOXS } from "@/graphql/box";
import { GET_ROOMS, GET_ROOMS_SEVGI } from "@/graphql/rooms";
import CashWithdrawed from "@/components/CashWithdrawed";
import PersonalIncome from "@/components/PersonalIncome";
import PersonalExpense from "@/components/PersonalExpense";

export default function records() {
  const {
    showAdd,
    showWitdraw,
    showingPersonalIncome,
    showingPersonalExpense,
  } = useSelector((state) => state.modalReducer);

  const infoBoxs = useQuery(GET_BOXS);
  const boxs = infoBoxs.data;
  const infoRoomsSevgi = useQuery(GET_ROOMS_SEVGI);
  const roomsSevgi = infoRoomsSevgi.data;
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

  const handleClickOporto2 = (event) => {
    event.preventDefault();
    setPlace("Oporto");
    dispatch(showWithdrawCashAction());
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

  const handleClickSevgi = (event) => {
    event.preventDefault();
    setPlace("Sevgi");
    setRoomPlace(roomsSevgi.getRoomsSevgi);
    dispatch(showAddCashAction());
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

  const handleClickSevgi2 = (event) => {
    event.preventDefault();
    setPlace("Sevgi");
    dispatch(showWithdrawCashAction());
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

  const handleClickPersonal2 = (event) => {
    event.preventDefault();
    setPlace("Personal");
    dispatch(showPersonalExpense());
    // formData.workerId = value;
    // dispatch(filterDayWorker(formData));
  };

  const handleClickPersonal = (event) => {
    event.preventDefault();
    setPlace("Personal");
    dispatch(showPersonalIncome());
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
            handleClick1={handleClickOporto2}
            handleClick2={handleClickOporto}
          />
          <Record
            label="Sevgi Sense Hostal"
            handleClick1={handleClickSevgi2}
            handleClick2={handleClickSevgi}
          />
          <Record
            label="Movimientos Personales"
            handleClick1={handleClickPersonal2}
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
      <PublicModal
        opened={showWitdraw}
        onClose={() => dispatch(showWithdrawCashAction())}
        size={largeScreen ? "35%" : "90%"}
      >
        <CashWithdrawed place={place} boxId={value} />
      </PublicModal>
      <PublicModal
        opened={showingPersonalIncome}
        onClose={() => dispatch(showPersonalIncome())}
        size={largeScreen ? "35%" : "90%"}
      >
        <PersonalIncome place={place} boxId={value} />
      </PublicModal>
      <PublicModal
        opened={showingPersonalExpense}
        onClose={() => dispatch(showPersonalExpense())}
        size={largeScreen ? "35%" : "90%"}
      >
        <PersonalExpense place={place} boxId={value} />
      </PublicModal>
    </main>
  );
}
