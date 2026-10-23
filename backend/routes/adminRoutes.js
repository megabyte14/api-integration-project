import express from "express"
import { authentication, authorization } from "../middleware/backend-protection.js"

const router = express.Router()

router.get('/dashboard', authentication, authorization, (req, res) => {
    res.json({
        message: "Welcome Admin!"
    })
}
)
export default router