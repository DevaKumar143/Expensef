import api from "@/utils/api";

export const registerUser = async (payload) => {
  const response = await api.post("/register", payload);
  return response.data;
};

export const loginUser = (data) => {
  return api.post("/login", data);
};