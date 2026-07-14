import { registerUser, loginUser } from "@/api/auth.api";

export const register = async (userData) => {
  try {
    const data = await registerUser(userData);
    return data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const login = async (userData) => {
    try {
        const response = await loginUser(userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
  
};