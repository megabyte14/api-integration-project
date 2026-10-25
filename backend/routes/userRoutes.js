
import express from "express"
import { authentication, authorization } from "../middleware/backend-protection.js"
import { sellerLogin,vendorLogin } from "../controller/authController.js"
import { sellerRegistration,vendorRegister } from "../controller/authController.js"

const router=express.Router()

router.get("/dashboard",authentication,(req,res)=>{
    if (req.user.role !== "seller" && req.user.role !== "vendor") {
        return res.status(403).json({
            message:"Access denied!"
        })
    }

    res.json({
        message:"Welcome User!"
    })
})


router.post("/seller/login",sellerLogin)
router.post("/vendor/login",vendorLogin)

router.post("/seller/registration",sellerRegistration)
router.post("/vendor/registration",vendorRegister)
export default router
