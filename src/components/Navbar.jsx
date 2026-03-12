import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../redux/slices/userSlice";
import { BASE_URL } from "../utils/constants";

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // Logout handler
  const logoutHandler = async () => {
    try {
      // Call backend logout API
      await axios.post(
        `${BASE_URL}logout`,
        {},
        { withCredentials: true }
      );

      // Clear Redux user state
      dispatch(removeUser());

      // Remove token if stored in localStorage/cookies
      localStorage.removeItem("token");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      // Optional: show an error component or toast
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      {/* LEFT SECTION */}
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl text-secondary hover:text-primary">
          DevConnect
        </a>
      </div>

      {/* RIGHT SECTION */}
      <div className="navbar-end gap-2">
        {/* Menu items */}
        <ul className="menu menu-horizontal px-1">
          <li><a className="hover:text-primary">Explore</a></li>
          <li><a className="hover:text-primary">Projects</a></li>
        </ul>

        {/* Messages & Notifications */}
        <button className="btn btn-ghost hover:btn-primary btn-circle text-lg">💬</button>
        <button className="btn btn-ghost hover:btn-primary btn-circle text-lg">🔔</button>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >{ user && (
            <div className="w-10 rounded-full">
              <img
                src={user?.profilePhoto}
                alt="profile"
              />
            </div>)
           }
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li><a>Profile</a></li>
            <li><a>My Projects</a></li>
            <li><a>Create Project</a></li>
            <li><a>Settings</a></li>
            {/* ✅ Corrected logout button */}
            <li>
              <button
                type="button"
                onClick={logoutHandler}
                className="w-full text-left bg-gradient-to-r from-red-400 to-red  -600 text-white hover:from-red-500 hover:to-red-700 rounded px-2 py-1"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};