import User from "@/models/user.model";
import Payment from "@/models/payment.model";
import Box from "@/models/box.model";
import Room from "@/models/room.model";

import { dbConnect } from "@/utils/mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dbConnect();

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getPayment: async () => {
      return await Payment.find()
        .populate("roomId", "roomNumer")
        .populate("userId", "firstName lastName")
        .populate("boxId", "nameBox");
    },
    getRooms: async () => {
      return await Room.find();
    },
  },
  Mutation: {
    async login(_, args) {
      const { email, password } = args;
      const user = await User.findOne({ email });

      if (!user) throw new Error("user or password error");

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) throw new Error("user or password error");

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.firstName,
          lastName: user.lastName,
          typeUser: user.typeUser,
        },
        process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
        { expiresIn: "9h" }
      );

      return { token, user };
    },
    async getUser(_, args) {
      const { token } = args;
      const { id } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      const user = await User.findById(id);

      if (!user) throw new Error("token error");
    },
  },
};
