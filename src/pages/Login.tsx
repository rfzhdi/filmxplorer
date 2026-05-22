import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi login sederhana
    if (email && password) {
      login();
      navigate("/home"); // Redirect ke halaman utama setelah login
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      {/* Card Login */}
      <div className="max-w-md w-full bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-2xl">
        {/* Logo / Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-red-600 tracking-tighter">
            FILMXPLORER
          </h1>
          <p className="text-gray-400 mt-2">Welcome back, Movie Enthusiast!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Email */}
          <div>
            <label
              className="block text-sm font-medium text-gray-400 mb-2 text-left"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              title="Enter your email address"
              aria-label="Email Address"
            />
          </div>

          {/* Input Password */}
          <div>
            <label
              className="block text-sm font-medium text-gray-400 mb-2 text-left"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              title="Enter your password"
              aria-label="Password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg transform hover:scale-[1.02] active:scale-95"
            aria-label="Login"
            title="Login to your account"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Don't have an account?{" "}
            <span
              className="text-red-500 cursor-pointer hover:underline"
              aria-label="Sign Up"
            >
              Sign up for free
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
