import { GET_PAYMENT } from "@/graphql/box";
import { useQuery } from "@apollo/client";

import { Table, Select, Divider } from "@mantine/core";
import { useState } from "react";

import styles from "@/styles/Management.module.scss";
import Image from "next/image";

export default function management() {
  const { data, loading, error } = useQuery(GET_PAYMENT);

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

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>Hola Management</h1>
      </div>
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
    </main>
  );
}

// export async function getServerSideProps() {
//   // const data = await graphql({
//   //   schema,
//   //   source: gql`
//   //     query {
//   //       getPayment {
//   //         concept
//   //         cash
//   //         reasonOfPay
//   //         timeTransaction
//   //         typePayment

//   //         roomId {
//   //           roomNumer
//   //         }
//   //         userId {
//   //           firstName
//   //           lastName
//   //         }
//   //         boxId {
//   //           nameBox
//   //         }
//   //       }
//   //     }
//   //   `,
//   // });
//   // console.log("esto es data del ServerSideProps", data);
//   return { props: {} };
// }
