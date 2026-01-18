import {create} from "zustand"
import { axiosInstance } from "../lib/axios";

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

  }

}));



// What is Zustand?

// Zustand is a lightweight state management library for React.
// It lets you create a global store without boilerplate, reducers, or context providers.

// Think of it as:

// Simpler than Redux

// Cleaner than Context API for global state

// Very popular in modern React / MERN apps