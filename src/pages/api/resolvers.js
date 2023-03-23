import User from "@/models/user.model";
import { dbConnect } from "@/utils/mongoose";

dbConnect();

export const resolvers = {
  Query: {
    getUser: async () => {
      return await User.find();
    },
  },
};
