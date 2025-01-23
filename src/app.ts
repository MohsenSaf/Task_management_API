import express from "express"
import "express-async-errors"
import errorHandler from "@/middlewares/error-handler"
import methodOverride from "@/middlewares/method-override"
import auth from "@/middlewares/auth"
import session from "express-session"
import { redisClient } from "@/configs/redis"
import cors from "cors"
import { RedisStore } from "connect-redis"
import prisma from "@/prisma"
import router from "./routes"

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
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:
        process.env.NODE_ENV === "production"
          ? 1000 * 60 * 60 * 24 * 7
          : 1000 * 60 * 50,
    },
  })

  app.use(sessionMiddleware)

  app.use(auth)

  app.use(methodOverride)
  app.use(router)
  app.use(errorHandler)

  process.on("SIGINT", async () => {
    await prisma.$disconnect()
    process.exit(0)
  })

  return app
}
