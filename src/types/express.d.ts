import * as express from "express"

declare global {
  namespace Express {
    interface SessionData {
      user?: User
    }
    interface Request {
      user?: User
    }
  }
}
