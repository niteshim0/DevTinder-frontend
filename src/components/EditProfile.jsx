import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export const EditProfile = () => {

  const [profilePhoto, setProfilePhoto] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    experienceLevel: "",
    skills: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMsg("");

  try {
    const response = await axios.patch(
      `${BASE_URL}profile/edit`,
      {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
        image,
      },
      { withCredentials: true }
    );

    navigate("/profile");

  } catch (error) {
    setErrorMsg(error.response?.data?.message || "Something went wrong");
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800">
      <div className="w-full max-w-sm rounded-xl bg-gray-900 p-8 shadow-2xl">

        <h2 className="text-center text-2xl font-bold text-white">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="text"
            name="experienceLevel"
            placeholder="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-full rounded-md p-2 bg-gray-700 text-white"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills"
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
            placeholder="profilePhoto URL"
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
            className="w-full rounded-md p-2 bg-gray-700 text-white"
          />

          {errorMsg && (
            <p className="text-red-400 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-500 px-3 py-2 text-white font-semibold hover:bg-indigo-400"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
};