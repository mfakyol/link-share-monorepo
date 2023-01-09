import { Request } from "express";

export interface AuthContext {
  userId?: string | any;
  email?: string | any;
  pageId?: string | any;
}

declare global {
  namespace Express {
    export interface Request {
      authContext?: AuthContext;
    }
  }
}
