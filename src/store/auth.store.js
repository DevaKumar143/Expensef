import { create } from "zustand";
import { register, login } from "@/services/auth.servics";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  registerUser: async (data) => {
    set({ loading: true, error: null });

    try {
      const result = await register(data);

      set({
        loading: false,
      });

      return result;
    } catch (error) {
      set({
        loading: false,
        error: error,
      });

      throw error;
    }
  },

  loginUser: async (data) => {
    set({ loading: true, error: null });

    try {
      const result = await login(data);

      set({
        user: result.user,
        loading: false,
      });

      if (result.token) {
        localStorage.setItem("token", result.token);
      }

      return result;
    } catch (error) {
      set({
        loading: false,
        error: error,
      });

      throw error;
    }
  },
}));

export default useAuthStore;