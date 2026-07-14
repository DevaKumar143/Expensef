"use client";

import React, { useState } from "react";
import useExpenseStore from "@/store/expense.store";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [expense, setExpense] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  });
  const { addExpense } = useExpenseStore();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...expense,
    amount: Number(expense.amount),
  };

  try {
    const result = await addExpense(payload);
    console.log(result);
    alert("Expense Added");
         router.push("/");
  } catch (err) {
    console.log(err);
    alert("Expense Added Failed");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add Expense
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="
                w-full rounded-lg border border-gray-300 
                px-4 py-3 text-gray-800
                outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={expense.description}
              onChange={handleChange}
              placeholder="Medical checkup"
              className="
                w-full rounded-lg border border-gray-300 
                px-4 py-3 text-gray-800
                outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>

            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
              className="
                w-full rounded-lg border border-gray-300 
                px-4 py-3 text-gray-800
                outline-none
                focus:ring-2 focus:ring-blue-500
              "
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              className="
                w-full rounded-lg border border-gray-300 
                px-4 py-3 text-gray-800
                outline-none
                focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-whitefont-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 active:scale-95">
            Add Expense
          </button>

        </form>
      </div>
    </div>
  );
};

export default Page;