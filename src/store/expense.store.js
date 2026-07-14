import { create } from "zustand";
import {
  getExpenses,
  createExpense,
  deleteExpense,
} from "@/services/expense.service";

const useExpenseStore = create((set) => ({
  expenses: [],
  loading: false,
  error: null,

  fetchExpenses: async () => {
    set({ loading: true });

    try {
      const data = await getExpenses();

      set({
        expenses: data.expenses,
        loading: false,
      });
    } catch (error) {
      set({
        error,
        loading: false,
      });
    }
  },

  fetchExpenses: async () => {
  set({ loading: true });

  try {
    const data = await getExpenses();

    set({
      expenses: data.expenses,
      totalAmount: data.totalAmount,
      count: data.count,
      loading: false,
      error: null,
    });
  } catch (error) {
    set({
      error,
      loading: false,
    });
  }
},

  addExpense: async (expense) => {
    try {
      const data = await createExpense(expense);

      set((state) => ({
        expenses: [...state.expenses, data],
      }));

      return data;
    } catch (error) {
      throw error;
    }
  },

  removeExpense: async (id) => {
    try {
      await deleteExpense(id);

      set((state) => ({
        expenses: state.expenses.filter((item) => item._id !== id),
      }));
    } catch (error) {
      throw error;
    }
  },
}));

export default useExpenseStore;
