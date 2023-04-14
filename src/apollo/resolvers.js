import User from "@/models/user.model";
import Payment from "@/models/payment.model";
import Box from "@/models/box.model";
import Room from "@/models/room.model";
import RoomSevgi from "@/models/roomSevgi.model";
import Withdraw from "@/models/withdraw.model";
import PersonalIncome from "@/models/personalIncome.model";
import PersonalExpense from "@/models/personalExpense.model";

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
    getRoomsSevgi: async () => {
      return await RoomSevgi.find();
    },
    getBoxs: async () => {
      return await Box.find();
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
        { expiresIn: "4h" }
      );

      return { token, user };
    },
    async getUser(_, args) {
      const { token } = args;
      const { id } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      const user = await User.findById(id);

      if (!user) throw new Error("token error");
    },
    async newRoomSevgi(_, args) {
      const { roomNumer, price, token } = args;
      const { id } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      const user = await User.findById(id);
      if (!user) throw new Error("token error");

      const room = await RoomSevgi.create({
        roomNumer,
        price,
      });
      return room;
    },
    async newPayment(_, args) {
      const {
        token,
        roomId,
        boxId,
        reasonOfPay,
        typePayment,
        cash,
        timeTransaction,
        concept,
        place,
        bank,
      } = args;
      const { id } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      const user = await User.findById(id);
      if (!user) throw new Error("token error");
      const room = await Room.findById(roomId);
      if (!room) throw new Error("Room error");
      const box = await Box.findById(boxId);
      if (!box) throw new Error("box error");

      const payment = await Payment.create({
        boxId: box,
        userId: user,
        roomId: room,
        reasonOfPay,
        typePayment,
        cash,
        concept,
        timeTransaction,
        place,
        bank,
      });
      return payment;
    },

    async newWithdraw(_, args) {
      const {
        token,
        boxId,
        reasonOfWithdraw,
        typeWithdraw,
        cash,
        timeTransaction,
        concept,
        place,
        bank,
        who,
      } = args;

      const { id } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      const user = await User.findById(id);
      if (!user) throw new Error("token error");
      const box = await Box.findById(boxId);
      if (!box) throw new Error("box error");

      const withdraw = await Withdraw.create({
        boxId: box,
        userId: user,
        who,
        reasonOfWithdraw,
        typeWithdraw,
        cash,
        concept,
        timeTransaction,
        place,
        bank,
      });
      return withdraw;
    },
    async newPersonalIncome(_, args) {
      const {
        token,
        boxId,
        typePayment,
        cash,
        timeTransaction,
        concept,
        place,
        bank,
      } = args;
      const { id } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      const user = await User.findById(id);
      if (!user) throw new Error("token error");
      const box = await Box.findById(boxId);
      if (!box) throw new Error("box error");

      const payment = await PersonalIncome.create({
        boxId: box,
        userId: user,
        typePayment,
        cash,
        concept,
        timeTransaction,
        place,
        who,
        bank,
      });
      return payment;
    },
    async newPersonalExpense(_, args) {
      const {
        token,
        boxId,
        typeWithdraw,
        cash,
        timeTransaction,
        concept,
        place,
        who,
        bank,
      } = args;
      const { id } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
      const user = await User.findById(id);
      if (!user) throw new Error("token error");
      const box = await Box.findById(boxId);
      if (!box) throw new Error("box error");

      const expense = await PersonalExpense.create({
        boxId: box,
        userId: user,
        typeWithdraw,
        cash,
        concept,
        timeTransaction,
        place,
        who,
        bank,
      });
      return expense;
    },
  },
};
