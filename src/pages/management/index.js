import { GET_PAYMENT } from "@/graphql/box";
import { useQuery } from "@apollo/client";

export default function management({ dataWorkers }) {
  const { data, loading, error } = useQuery(GET_PAYMENT);
  console.log("esto es data", data);

  return (
    <div>
      <h1>Hola Management</h1>
    </div>
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
