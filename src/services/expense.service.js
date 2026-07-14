import {getExpensesApi,createExpenseApi,deleteExpenseApi} from "@/api/expense.api";

export const getExpenses = async () => {
  try {
    const response = await getExpensesApi();
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createExpense = async (data) => {
  try {
    const response = await createExpenseApi(data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await deleteExpenseApi(id);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};