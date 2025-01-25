import { BadRequestError, NotFoundError } from "@/utils/errors"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "@/utils/token"
import { Request, Response } from "express"
import prisma from "@/prisma"
import { log } from "@/utils/logger"

class AuthController {
  async register(req: Request, res: Response) {
    if (req.user) {
      throw new BadRequestError("user is already login")
    }
    const { username, password, email } = req.body


    try {
      const hashedPassword: string = bcrypt.hashSync(password, 12)
      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          email,
        },
      })
      res.json({ ...user, password: undefined })
    } catch (error: any) {
      if (error.original.code === "ER_DUP_ENTRY") {
        if (error.fields.username) {
          throw new BadRequestError("Username is duplicated!")
        }
        if (error.fields.email) {
          throw new BadRequestError("Email is duplicated!")
        }
      }

      throw new Error(error)
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    })

    if (!user) {
      throw new BadRequestError("Credential Error!")
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestError("Credential Error!")
    }

    const token = generateAccessToken(user)
    let refreshToken = user.token

    if (!refreshToken) {
      refreshToken = generateRefreshToken()

      await prisma.user.update({
        where: { id: user.id },
        data: {
          token: refreshToken,
        },
      })
    }

    req.session.user = { ...user, password: undefined, token: undefined }

    log({ message: "user:login", metadata: { user } })

    res.json({ ...user, accessToken: token, token: refreshToken })
  }

  async getToken(req: Request, res: Response) {
    const { refreshToken } = req.body

    const user = await prisma.user.findUnique({
      where: { token: refreshToken },
    })

    if (!user) {
      throw new NotFoundError("User not Found")
    }

    const token = generateAccessToken(user)

    res.json({ accessToken: token })
  }

  logout(req: Request, res: Response) {
    if (req.session.user) {
      req.session.destroy((error) => {
        if (!error) {
          log({ message: "user:logout", metadata: { user: req.user } })
          res.json({ message: "user logout" })
        }
      })
    } else {
      throw new NotFoundError("User is not logged in")
    }
  }
}

export default new AuthController()
