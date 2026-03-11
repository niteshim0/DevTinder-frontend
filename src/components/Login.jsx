import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // <-- For showing invalid credentials
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // reset error on submit

    try {
      const response = await axios.post(
        `${BASE_URL}login`, // <-- Make sure endpoint is 'login', not 'logout'
        { email: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.user));
      navigate("/");
    } catch (error) {
      // Show friendly error
      setErrorMsg(error.response?.data?.message || "Invalid email or password");
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

          {/* Error message */}
          {errorMsg && (
            <p className="text-red-600  px-3 py-2 rounded mt-2 text-sm">
              {errorMsg}
            </p>
          )}

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