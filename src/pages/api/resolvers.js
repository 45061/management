import User from "@/models/user.model";
import { dbConnect } from "@/utils/mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

dbConnect();

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
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

      const serialized = serialize("myTokenName", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 9,
        path: "/",
      });
      // res.setHeader("Set-Cookie", serialized);
      return { token };
    },
  },
};
