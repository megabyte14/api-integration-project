import mongoose from "mongoose";
import express from "express";
import connectDB from "./config/config.js";
import adminRoutes from "./routes/adminRoutes.js";

import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(express.json())
app.use("/api/admin", adminRoutes)



const PORT = process.env.PORT || 5000
connectDB().then(() => {
    app.listen(PORT, () => { console.log("Server is running on port" + PORT) })
}

)