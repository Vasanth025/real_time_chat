import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js";
import { v2 as cloudinary } from "cloudinary";

export const signUpUser = async(req,res) =>{

    try {
        const {fullName,email,password} = req.body;

        if(!email || !fullName || !password)
            return res.status(400).json({error:"All Fields are required"})

        const user = await User.findOne({email})

        if(user)
            return res.json({error:"email already exists"})

        if(password.length < 6)
            return res.status(400).josn({error:"Password must be above 6 characters"})

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullName:fullName,
            email:email,
            password:hashedPass,
        })

        if(newUser)
        {
            generateToken(newUser._id,res);
            await newUser.save();

            return res.status(200).json({ 
                fullName:fullName,
                email:email,
            })
        }

    } catch (error) {
        console.error(error)
        return res.json({error:"Internal Server Error"})
    }
}

export const loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body;

        if(!email || !password)
            return res.status(400).json({error:"All Fields are required"})

        const user = await User.findOne({email})

        if(!user)
            return res.status(404).json({error:"user not exists"})

        const validPass = bcrypt.compare(user.password, password);

        if(!validPass)
        {
            return res.json(401).json({error:"Invalid Credentials"})
        }

        await generateToken(user._id,res);
           

        return res.status(200).json({ 
            fullName:user.fullName,
            email:email,
        })
        

    } catch (error) {
        console.error(error)
        return res.json({error:"Internal Server Error"})    
    }
}

export const logoutUser = async(req,res) =>{
    try {
        res.cookie("jwt","");
        return res.status(200).json({message:"user logged out successfully"})
    } catch (error) {
        console.error(error)
        return res.json({error:"Internal Server Error"}) 
    }
}

export const updateProfile = async(req,res) =>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic)
            return res.status(404).json({error:"profile pic is required"})

        const updloadResponse = await cloudinary.uploader.upload(profilePic)

        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:updloadResponse.secure_url},{new:true})

        return res.status(201).json(updatedUser)
    } catch (error) {
        console.error(error)
        return res.json({error:"Internal Server Error"}) 
    }
}

export const checkAuth = async(req,res)=>{
    try {
        console.log(req.user);
        return res.json(req.user);
    } catch (error) {
        console.error(error)
        return res.json({error:"Internal Server Error"}) 
    }
}