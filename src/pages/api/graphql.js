import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { gql } from "graphql-tag";

import User from "@/models/user.model";
import { dbConnect } from "@/utils/mongoose";

dbConnect();
// import { resolvers } from "./resolvers.js";
// import { typeDefs } from "./typeDefs.js";

const typeDefs = gql`
  type Query {
    getUsers: [User]!
  }

  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    numer: String!
    typeUser: Boolean
  }
`;

const resolvers = {
  Query: {
    getUser: async () => {
      return await User.find();
    },
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
});

export default startServerAndCreateNextHandler(server);
