import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app=express();
const port=process.env.PORT||5000;
const MONGO_URI=process.env.MONGO_URI;

app.use (express.json());
app.use(cors());

mongoose.connect(MONGO_URI)
.then(()=>console.log("MOngoDB connected"))
.catch(err=>console.error("MongoDB connection error", err));

app.use("/auth",authRoutes);
app.use("/user",userRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

