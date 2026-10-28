import "dotenv/config"
import mongoose from "mongoose";
import express from "express";
import connectDB from "./config/config.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import cors from "cors"
import productRoutes from "./routes/productRoutes.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/admin", adminRoutes)
app.use("/api/vendor", userRoutes)
app.use("/api/seller", userRoutes)
app.use("/api/products", productRoutes);


const PORT = process.env.PORT || 5000
connectDB().then(() => {
    app.listen(PORT, () => { console.log("Server is running on port" + PORT) })
}
)
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1);
    });