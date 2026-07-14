
import api from "@/utils/api";


export const getExpensesApi = () => {
  return api.get("/api/expenses");
};


export const createExpenseApi = (data) => {
  return api.post("/api/expenses", data);
};


export const deleteExpenseApi = (id) => {
  return api.delete(`/api/expenses/${id}`);
};