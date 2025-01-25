import { Router } from "express"
import AuthController from "@/controllers/auth"
import validate from "@/middlewares/validate"
import { registerSchema, loginSchema, getTokenSchema } from "@/validators/user"

const router = Router()

router.post("/register", validate(registerSchema), AuthController.register)
router.post("/login", validate(loginSchema), AuthController.login)
router.post("/getToken", validate(getTokenSchema), AuthController.getToken)
router.get("/logout", AuthController.logout)

export default router
