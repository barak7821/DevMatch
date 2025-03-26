import Express from "express"
import { login, register, checkUser, googleLogin } from "../controllers/authController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = Express.Router()

router.post("/", login)
router.post("/register", register)
router.post("/google", googleLogin)
router.get("/", authMiddleware, checkUser)

export default router