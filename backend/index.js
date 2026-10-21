import mongoose from "mongoose";
import express from "express";

import connectDB from "./config/config.js";

import dotenv from "dotenv"
dotenv.config()


const app=express()
const PORT=process.env.PORT||5000
