import { Router } from "express"
import AuthController from "@/controllers/auth"

const router = Router()

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/getToken", AuthController.getToken)
router.get("/logout", AuthController.logout)

export default router
