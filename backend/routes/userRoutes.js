import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile",authenticateToken,async(req,res)=>{
    try{
        const user=await User.findOne({username:req.user.username});
        if(!user) return res.status(404).json({message:"User not found"});
    }catch(error){
        res.status(500).json({message:"server error", error:error.message});
    }
});

export default router;