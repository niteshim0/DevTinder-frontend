import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../redux/slices/userSlice";
import { useEffect } from "react";

export const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "profile/view", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addUser(res?.data));
      // move to feed section
    } catch (error) {
      console.log("User not logged in");
      if(error.status === 404){
        navigate('/login')
      }
    }
  };

  useEffect(() => {
    if (!user) {
      fetchLoggedInUser();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};