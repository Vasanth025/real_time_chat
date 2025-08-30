import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import {v2 as cloudinary} from "cloudinary";
import { getReceiverSocketId, io } from "../utils/socket.js";

export const getUsers = async(req,res)=>{
    try {
        const loggerUser = req.user._id;

        const users = await User.find({_id :{$ne : loggerUser}}).select("-password")

        return res.status(200).json(users)
    } catch (error) {
        console.error(error)
        return res.json({error:"Internal Server Error"}) 
    }
}

export const getMessages = async(req,res) =>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        console.log(userToChatId, myId);

        const messages = await Message.find({
            $or:[
                {senderId: userToChatId,receiverId:myId},
                {senderId: myId, receiverId:userToChatId}
            ]
        })

        return res.status(200).json({messages})
    } catch (error) {
        console.error(error)
        return res.json({error:"Internal Server Error"})
    }
}

export const sendMessages = async(req,res) =>{
    try {
        const{text,image} = req.body;
        const {id:userToChatId} = req.params;
        const myId = req.user._id;

        let imageUrl;
        if(image)
        {
            const uploadResponse = await cloudinary.uploader.upload(image);
           imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId:myId,
            receiverId:userToChatId,
            text,
            image:imageUrl
        })

        await newMessage.save();

        //todo to implement real time functionality
        const receiverSocketId = getReceiverSocketId(userToChatId);
        console.log("Receiver socket id", receiverSocketId);
        if(receiverSocketId)
        {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        return res.status(200).json(newMessage)
    } catch (error) {
        console.error(error)
        return res.json({error:"Internal Server Error"})
    }
}