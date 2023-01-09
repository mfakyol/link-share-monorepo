import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import UserModel from "../models/user.model";

dotenv.config();
const jsonParser = bodyParser.json();

export default function LoginRouter() {
  const route = () => {
    const router = express.Router();

    router.post("/", jsonParser, async (req, res) => {
      const { email, password } = req.body;
      if (!email || !password) {
        res.statusMessage = "email and password required for the body.";
        return res.status(400).end();
      }
      const user = await UserModel.findOne({ email });
      console.log(user);
      if (!user) return res.status(200).json({ status: false, message: "Email not found." });
      const isSame = bcrypt.compareSync(password, user.hash);
      if (!isSame) return res.status(200).json({ status: false, message: "Invalid password." });
      const secret = process.env.JWT_SECRET || "";
      const token = jwt.sign({ userId: user._id.toString(), email: user.email, pageId: user.page.toString() }, secret);
      return res.status(200).json({ status: true, token });
    });

    return router;
  };

  return {
    route,
    routerPrefix: `/login`,
  };
}
