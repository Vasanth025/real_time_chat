import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const usechatStore = create((set, get)=>({
    messaages:[],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,


    getUsers: async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get('/message/users');
            set({users: res.data})
        } catch (error) {
            toast.error("Something went wrong in fetching users")
        } finally {
            set({isUsersLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/message/getMessage/${userId}`);
            set({messaages: res.data.messages})
        } catch (error) {
            toast.error("Something went wrong in fetching user messages");
        } finally {
            set({isMessagesLoading: false})
        }
    },

    sendMessage: async (messageData) =>{
        const {selectedUser, messaages} = get();

        try {
            const res = await axiosInstance.post(`/message/create-message/${selectedUser._id}`,messageData);
            set({messaages:[...messaages,res.data]})
        } catch (error) {
            toast.error("Something is wrong in sending messages")
        }
    },

    subscribeToNewMessages:() =>{
        console.log("Subscribing to new messages");
        const selectedUser = get().selectedUser;
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage)=>{
            if(newMessage.senderId !== selectedUser._id) return;
            const {messaages} = get();
            set({messaages:[...messaages,newMessage]})
        })

    },

    unsubscribeFromNewMessages:() =>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage")
    },

    setSelectedUser: (selectedUser) => {
        set({selectedUser: selectedUser})
    }
}))