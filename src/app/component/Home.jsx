"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import useExpenseStore from "@/store/expense.store";

export default function Home() {
  const {
    expenses,
    totalAmount,
    count,
    fetchExpenses,
    removeExpense,
    loading,
  } = useExpenseStore();

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleDelete = async (id) => {
    if (expenses.length === 0) {
      alert("No expenses available to delete.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {
      await removeExpense(id);
      alert("Expense deleted successfully.");
    } catch (err) {
      alert("Failed to delete expense.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <h1 className="text-2xl font-semibold animate-pulse">
          Loading Expenses...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-5">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Expense Tracker
          </h1>

          <p className="text-gray-500 mt-2">
            {count} Expense{count !== 1 ? "s" : ""} Found
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-blue-600 text-white rounded-2xl shadow-xl px-8 py-5"
        >
          <p className="text-sm opacity-80">Total Expense</p>

          <h2 className="text-xl font-bold mt-1">
            ₹ {totalAmount}
          </h2>
        </motion.div>
      </div>
      {expenses.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <h2 className="text-xl font-bold text-gray-700">
            No Expenses Found
          </h2>

          <p className="text-gray-500 mt-3">
            Add your first expense to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {expenses.map((expense, index) => (
            <motion.div
              key={expense._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {expense.description}
                </h2>

                <div className="flex gap-3 mt-3 flex-wrap">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {expense.category}
                  </span>

                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                    {new Date(expense.date).toLocaleDateString()}
                  </span>
                </div>
              </div>

        
              <div className="text-right mt-5 md:mt-0">
                <h2 className="text-xl font-bold text-green-600">
                  ₹ {expense.amount}
                </h2>

                <button
                  onClick={() => handleDelete(expense._id)}
                  className="mt-4 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}