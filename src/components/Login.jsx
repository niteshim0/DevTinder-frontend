import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [emailId, setEmailId] = useState("arjun.nair@gmail.com");
  const [password, setPassword] = useState("Ar@8Na!4");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", 
        { email: emailId, password },
      {
        withCredentials : true
      });
      console.log("Login success:", response?.data);
      dispatch(addUser(response?.data));
      navigate('/')
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="w-full max-w-sm rounded-xl bg-gray-900 p-8 shadow-2xl">
        <h2 className="text-center text-2xl font-bold text-white">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Enter your email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="mt-2 block w-full rounded-md bg-gray-600 px-3 py-2 text-white placeholder:text-gray-300 focus:outline-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-md bg-gray-600 px-3 py-2 text-white placeholder:text-gray-300 focus:outline-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-500 px-3 py-2 text-white font-semibold hover:bg-indigo-400"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Not a member?{" "}
          <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Register here!
          </a>
        </p>
      </div>
    </div>
  );
};