"use client";

import React, { useState } from "react";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "next/navigation";

const Page = () => {
   const router = useRouter();
  const { registerUser, loading } = useAuthStore();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // console.log("Signup Data:", user);
     try {
      const result = await registerUser(user);
      // console.log(result);
      alert("Registration Successful");
         router.push("/");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
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
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              Password
            </label>

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="
                w-full rounded-lg border border-gray-300
                px-4 py-3 text-gray-800
                outline-none
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 active:scale-95">
            Signup
          </button>
        </form>

      </div>
    </div>
  );
};

export default Page;