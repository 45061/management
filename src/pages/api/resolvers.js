import User from "@/models/user.model";
import { dbConnect } from "@/utils/mongoose";

dbConnect();

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
  },
};
