import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import {v2 as cloudinary } from "cloudinary"
import cors from "cors"
import cookieParser from "cookie-parser";
import {io, app, server} from "./utils/socket.js"

import userRoutes from "./routes/userRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,       
}))
app.use(cookieParser())
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/user",userRoutes)
app.use("/api/message",messageRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("Database connected Successfully")})
.catch((err)=>{console.log(`something went wrong while connecting the database ${err}`)})

server.listen(process.env.PORT,()=>{console.log(`server connected ${process.env.PORT}`)})