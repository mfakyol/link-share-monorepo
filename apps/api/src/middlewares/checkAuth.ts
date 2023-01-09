import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AuthContext } from "../../types/express";

dotenv.config();

export default async function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (!req?.headers?.authorization) {
    req.statusMessage = "Bearer Token Required.";
    return res.status(401).end();
  }
  const token = req.headers.authorization.split(" ")?.[1];
  if (!token) {
    req.statusMessage = "Bearer Token not valid.";
    return res.status(401).end();
  }

  const secret = process.env.JWT_SECRET as jwt.Secret;
  const decoded = jwt.verify(token, secret) as AuthContext;

  if (!decoded) {
    req.statusMessage = "Invalid token.";
    return res.status(401).end();
  }

  req.authContext = {
    userId: decoded.userId,
    pageId: decoded.pageId,
    email: decoded.email,
  };

  next();
}
