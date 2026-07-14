import { create } from "zustand";
import { register, login } from "@/services/auth.servics";

const storedUser =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null;

const useAuthStore = create((set) => ({
  user: storedUser,
  loading: false,
  error: null,

 registerUser: async (data) => {
  set({ loading: true, error: null });

  try {
    const result = await register(data);
    console.log("Register Response:", result);

    const token = result.Authtoken; 

    let user = null;
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      user = payload.user || null;
    }

    if (token) {
      localStorage.setItem("auth-token", token);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    set({
      user: user || null,
      loading: false,
      error: null,
    });

    return result;
  } catch (error) {
    console.error("Register Error:", error);
    set({ loading: false, error });
    throw error;
  }
},

  loginUser: async (data) => {
  set({ loading: true, error: null });

  try {
    const result = await login(data);
    console.log("Login Response:", result);

    const token = result.Authtoken; 

    let user = null;
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      user = payload.user || null;
    }

    if (token) {
      localStorage.setItem("auth-token", token);
    }

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    set({
      user: user || null,
      loading: false,
      error: null,
    });

    return result;
  } catch (error) {
    console.error("Login Error:", error);
    set({ loading: false, error });
    throw error;
  }
},

  logout: () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");

    set({
      user: null,
      loading: false,
      error: null,
    });
  },
}));

export default useAuthStore;
