import crypto from "crypto"
import jwt from "jsonwebtoken"
import { User } from "@prisma/client"

export function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex")
}

export function generateAccessToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: "1000s",
    }
  )
}
