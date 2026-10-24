import express from "express"
import { authentication, authorization } from "../middleware/backend-protection.js"
import { adminLogin } from "../controller/authController.js"

const router = express.Router()

router.get('/dashboard', authentication, authorization, (req, res) => {
    res.json({
        message: "Welcome Admin!"
    })
}
)

router.post('/login',adminLogin)
export default router