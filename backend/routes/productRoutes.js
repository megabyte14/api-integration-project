import express from "express";
import { authentication } from "../middleware/backend-protection.js";
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controller/productController.js";

const router = express.Router();

const allowRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied!" });
    }
    next();
};

router.use(authentication);

router.get("/", allowRoles("admin", "vendor"), getProducts);
router.post("/", allowRoles("vendor"), createProduct);
router.put("/:id", allowRoles("admin", "vendor"), updateProduct);
router.delete("/:id", allowRoles("admin", "vendor"), deleteProduct);

export default router;