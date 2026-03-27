import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true; // Enable sending cookies with requests
const API_URL="https://moviemenia-2-0.onrender.com/api"

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  signup: async (username, email, password) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/api/signup`, {
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

  login: async (username, password) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        username,
        password,
      });
      set({ user: response.data.user, message: response.data.message });
      return response.data;
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Error logging in",
      });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true });
    try {
      const response = await axios.get(`${API_URL}/api/fetch-user`);
      set({ user: response.data.user, fetchingUser: false });
    } catch (error) {
      set({ user: null, fetchingUser: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/api/logout`);
      set({
        user: null,
        isLoading: false,
        message: response.data?.message || "Logged out",
      });
      return response.data?.message || "Logged out";
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Error logging out",
      });
      throw error;
    }
  },
}));
