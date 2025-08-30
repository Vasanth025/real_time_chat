import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

const BASE_URL = "http://localhost:4000";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      isCheckingAuth: false,
      isSigningIn: false,
      isLoggingIn: false,
      isUpdatingProfile: false,
      onlineUsers: [],
      socket: null,

      checkAuth: async () => {
        try {
          const res = await axiosInstance.get("/user/check");
          set({ authUser: res.data });
          get().connectSocket();
        } catch (error) {
          console.log("Error in checking auth ", error);
          set({ authUser: null });
        }
      },

      signUp: async (data) => {
        try {
          set({ isSigningIn: true });
          const res = await axiosInstance.post("/user/signUp", data);
          set({ authUser: res.data });
          get().connectSocket();
          toast.success("Signed Up Successfully");
        } catch (error) {
          console.log("Error in signing In", error);
          set({ authUser: null });
          toast.error("SignUp Failed");
        } finally {
          set({ isSigningIn: false });
        }
      },

      login: async (data) => {
        try {
          set({ isLoggingIn: true });
          const res = await axiosInstance.post("/user/login", data);
          set({ authUser: res.data });
          get().connectSocket();
          toast.success("Login Successful");
        } catch (error) {
          console.log("Error in Login", error);
          set({ authUser: null });
          toast.error("Login Failed");
        } finally {
          set({ isLoggingIn: false });
        }
      },

      logout: async () => {
        try {
          set({ isLoggingIn: false });
          await axiosInstance.post("/user/logout");
          set({ authUser: null });
          get().disconnectSocket();
          toast.success("Logged Out Successfully");
        } catch (error) {
          console.log("Error in logout", error);
          toast.error("Logout Failed");
        }
      },

      updateProfile: async (data) => {
        try {
          set({ isUpdatingProfile: true });
          const res = await axiosInstance.put("/user/updateProfile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("Error in updating profile", error);
          toast.error("Profile update Failed");
        } finally {
          set({ isUpdatingProfile: false });
        }
      },

      connectSocket: () => {
        const socket = io(BASE_URL,{
          query: {
            userId: get().authUser._id
          }
        });
        const {authUser} = get();

        if(!authUser || get().socket?.connected){
          return;
        }
        socket.connect(); 
        set({socket: socket})

        socket.on("getOnlineUsers", (userIds)=>{
          set({onlineUsers: userIds})
        })

      },
      disconnectSocket: () => {
        if(get().socket?.connected){
          get().socket.disconnect();
        }
      },
    }),
    {
      name: "auth-store", // key in localStorage
      partialize: (state) => ({ authUser: state.authUser }), // only persist authUser
    }
  )
);
