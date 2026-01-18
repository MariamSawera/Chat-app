import {create} from "zustand"
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,

  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,     //set loading state



  checkAuth: async() => {
    try{
        const res = await axiosInstance.get("/auth/check");
        set({authUser: res.data})
    }catch(error){
        console.log("error in checkAuth:", error)
        set({authUser: null})
    }finally{
        set({isCheckingAuth: false});
    }
  },

  signup: async(data) => {
    set({
        isSigningUp: true
    });
    try{
        const res = await axiosInstance.post("/auth/signup", data);
        set({authUser:res.data});
        toast.success("Account Created successfully");

    }catch(error){
        toast.error(error.response.data.message);

    }finally{
        set({ isSigningUp: false})

    }

  }

}));



// What is Zustand?

// Zustand is a lightweight state management library for React.
// It lets you create a global store without boilerplate, reducers, or context providers.

// Think of it as:

// Simpler than Redux

// Cleaner than Context API for global state

// Very popular in modern React / MERN apps