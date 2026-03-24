
import {create} from 'zustand';
import axios from 'axios';

export const useAuthStore=create((set)=>({
    User:null,
    isLoading:false,
    error:null,
    message:null,
    fetchingUser:true,

    signup:async(username,email,password)=>{
        set({isLoading:true,message:null})

        try{
          const response=await axios.post('/api/signup',{username,email,password})
          set({User:response.data.user,message:response.data.message})  
        }
        catch(error){
            set({error:error.message})
        }
    }
}))