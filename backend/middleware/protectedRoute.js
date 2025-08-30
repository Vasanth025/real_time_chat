import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

export const protectedRoute = async(req,res,next) =>{
    try {
        const token = req.cookies.jwt;

        if(!token)
            return res.status(404).json({error:"token not found"})

        const decode = jwt.verify(token,process.env.JWT_SECRET)

        if(!decode)
            return res.status(402).json({error:"Unauthorized token"})

        const user = await User.findById(decode.userId).select("-password")

        if(!user)
            return res.status(404).json({error:"User not found"})

        req.user = user;

        next()
    } catch (error) {
        console.error(error);
        return res.status(500).json({error:"Internal Server error"})
    }
}