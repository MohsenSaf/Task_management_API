import * as express from "express"

interface JwtPayload {
  id: number 
  username: string
  email: string
  [key: string]: any
}

declare global {
  namespace Express {
    interface SessionData {
      user?: JwtPayload 
    }
    interface Request {
      user?: JwtPayload | null
    }
  }
}
