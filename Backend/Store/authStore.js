
import { create } from 'zustand'
import axios from 'axios';
axios.defaults.withCredentials=true; // Enable sending cookies with requests
export const useAuthStore=create((set) => ({
    user:null,
    isLoading:false,
    error:null,
    message:null,
    fetchingUser:true,

    signup:async(username,email,password)=>{
        set({isLoading:true,message:null,error:null})

        try{
          const response=await axios.post('/api/signup',{username,email,password})
          set({
            user: response.data.user,
            message: response.data.message,
            isLoading: false,
            error: null,
          })  
        }
        catch(error){
            set({
              isLoading: false,
              error: error.response?.data?.message || error.message || "Error signing up",
            })
        }
    },

    login: async (username, password) => {
    set({ isLoading: true, message: null, error: null });

    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      const { user, message } = response.data;

      set({
        user,
        message,
        isLoading: false,
      });

      return { user, message };
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error logging in",
      });

      throw error;
    }
  },
}))
