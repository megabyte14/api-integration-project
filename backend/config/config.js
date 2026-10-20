import mongoose from "mongoose";
const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO.URI)
        console.log("Database is connected.")
    }
    catch(error){
        console.log("Failed to connect to database.")
        process.exit()
    }
}
module.exports=connectDB