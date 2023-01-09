import bcrypt from "bcrypt";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { slug } from "../lib/slug";
import bodyParser from "body-parser";
import PageModel from "../models/page.model";
import UserModel from "../models/user.model";
import LinkModel from "../models/link.model";
import { validateEmail, validatePassword } from "../lib/validate";

dotenv.config();
const jsonParser = bodyParser.json();

export default function SignupRouter() {
  const route = () => {
    const router = express.Router();

    router.post("/", jsonParser, async (req, res) => {
      const { email, endPoint, password } = req.body;

      if (!email || !endPoint || !password) {
        res.statusMessage = "email, endPoint, password required for the body.";
        return res.status(400).end();
      }

      const emailValidationError = validateEmail(email);

      if (emailValidationError) return res.status(200).json({ status: false, message: emailValidationError });

      const passwordValidationError = validatePassword(password);

      if (passwordValidationError) return res.status(200).json({ status: false, message: passwordValidationError });

      if (endPoint.length < 3 || endPoint.length > 32)
        return res
          .status(200)
          .json({ status: false, message: "endPoint must be minimum 3 and maximum 32 characters." });

      if (endPoint != slug(endPoint))
        return res
          .status(200)
          .json({ status: false, message: "endPoint must be lowercase and url must be url safe(slug)." });

      let user;
      let page;
      let errorFlag = 0;

      try {
        const styles = {
          backgroundColor: "#1b1b1b",
          backgroundType: "flat",
          fontColor: "#f0f0f0",
          fontFamily: "Inter",
          link: {
            backgroundColor: "#353535",
            color: "#f0f0f0",
            shadowColor: "#d0d0d0",
            style: "outlinerounded",
          },
        };
        const link1 = new LinkModel({ title: "google", href: "https://www.google.com" });
        const link2 = new LinkModel({ title: "yotube", href: "https://www.youtube.com" });

        const links = [link1, link2];

        const profileTitle = endPoint;

        page = new PageModel({ endPoint, styles, links, profileTitle });

        await page.save();

        errorFlag = 1;

        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        user = new UserModel({ email, salt, hash, page: page._id });

        await user.save();
      } catch (error: any) {
        if (error.code == 11000) {
          if (errorFlag == 0) {
            return res.status(200).json({ status: false, message: "This end point is already using." });
          } else {
            await PageModel.deleteOne({ endPoint });
            return res.status(200).json({ status: false, message: "This email is already registered." });
          }
        }

        res.statusMessage = "Unknown error occured.";
        return res.status(500).end();
      }

      const secret = process.env.JWT_SECRET || "";
      const token = jwt.sign({ userId: user._id.toString(), email: user.email, pageId: user.page.toString() }, secret);

      return res.status(200).json({ status: true, token });
    });

    return router;
  };

  return {
    route,
    routerPrefix: `/signup`,
  };
}
