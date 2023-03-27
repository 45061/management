import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { schema } from "@/apollo/schema.js";

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);
