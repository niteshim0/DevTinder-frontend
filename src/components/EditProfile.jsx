import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice.js";
import { Card } from "./Card.jsx";

export const EditProfile = () => {

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);

  const [formData, setFormData] = useState({
    experienceLevel: user?.experienceLevel || "",
    skills: user?.skills?.join(", ") || "",
    location: user?.location || "",
    profilePhoto: user?.profilePhoto || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setLoading(true);

    try {

      const skillsArray = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      if (skillsArray.length < 2) {
        setErrorMsg("At least 2 skills are required");
        setLoading(false);
        return;
      }

      const response = await axios.patch(
        `${BASE_URL}profile/edit`,
        {
          ...formData,
          skills: skillsArray
        },
        { withCredentials: true }
      );

      dispatch(addUser(response.data));

      setIsError(false);
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/profile");
      }, 2000);

    } catch (error) {

      setIsError(true);
      setShowToast(true);

      setErrorMsg(error?.response?.data?.message || "Something went wrong");

      setTimeout(() => setShowToast(false), 2500);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* TOAST */}
      {showToast && (
        <div className="toast toast-top toast-center">
          {!isError ? (
            <div className="alert alert-success">
              <span>Profile updated successfully ✅</span>
            </div>
          ) : (
            <div className="alert alert-error">
              <span>{errorMsg || "Something went wrong ❌"}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex min-h-screen items-center justify-center bg-gray-800 gap-10 flex-wrap">

        {/* FORM */}
        <div className="w-full max-w-sm rounded-xl bg-gray-900 p-8 shadow-2xl">

          <h2 className="text-center text-2xl font-bold text-white">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            <input
              type="text"
              name="experienceLevel"
              placeholder="Experience Level"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full rounded-md p-2 bg-gray-700 text-white"
            />

            <input
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              value={formData.skills}
              onChange={handleChange}
              className="w-full rounded-md p-2 bg-gray-700 text-white"
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full rounded-md p-2 bg-gray-700 text-white"
            />

            <input
              type="text"
              name="profilePhoto"
              placeholder="Profile Photo URL"
              value={formData.profilePhoto}
              onChange={handleChange}
              className="w-full rounded-md p-2 bg-gray-700 text-white"
            />

            {errorMsg && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-indigo-500 px-3 py-2 text-white font-semibold hover:bg-indigo-400 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

          </form>
        </div>

        {/* LIVE PREVIEW */}
        <div>
          <Card
            preview={true}
            user={{
              ...user,
              ...formData,
              skills: formData.skills
                ? formData.skills.split(",").map((s) => s.trim())
                : []
            }}
          />
        </div>

      </div>
    </>
  );
};