import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  signup: async (username, email, password) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post("/api/signup", {
        username,
        email,
        password,
      });
      set({ user: response.data.user, message: response.data.message });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
