import express from "express"
import "express-async-errors"
import errorHandler from "@/middlewares/error-handler"
import methodOverride from "@/middlewares/method-override"
import auth from "@/middlewares/auth"
import session from "express-session"
import { redisClient } from "@/configs/redis"
import cors from "cors"
import { RedisStore } from "connect-redis"

export async function bootstrap() {
  const app = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(cors())

  const store = new RedisStore({ client: redisClient })

  const sessionMiddleware = session({
    store,
    secret: String(process.env.SECRET),
    resave: false,
    saveUninitialized: true,
  })

  app.use(sessionMiddleware)

  app.use(auth)

  // app.use(errorHandler)
  // app.use(methodOverride)

  return app
}
