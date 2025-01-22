// @types/express-session.d.ts or types/express-session.d.ts

import "express-session"

declare module "express-session" {
  interface SessionData {
    user?: {
      id: string
      username: string
      email: string
      [key: string]: any
    }
  }
}
