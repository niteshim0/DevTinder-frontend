import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../redux/slices/feedSlice";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const Card = ({ user, preview = false, handleRemove }) => {
  const { _id } = user;
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Optimistic swipe handler
  const handleSwipes = async (status) => {
    // Backup in case rollback needed
    const backupId = _id;

    try {
      // Optimistically remove user
      if (handleRemove) handleRemove(_id);

      // API call
      await axios.post(
        `${BASE_URL}request/send/${status}/${_id}`,
        {},
        { withCredentials: true }
      );

      setError(null);
    } catch (err) {
      // Rollback if API fails
      dispatch(addFeed([user])); // Re-add user to feed
      setError(
        err.response?.status === 401
          ? "Please login first"
          : err.response?.status === 404
          ? "Connections not found"
          : "Something went wrong"
      );
    }
  };

  if (!user) return null;

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      {/* PROFILE IMAGE */}
      <figure>
        <img
          src={user?.profilePhoto}
          alt={user?.name}
          className={`object-cover ${
            preview ? "h-32 w-32 rounded-full m-auto" : "h-60 w-full"
          }`}
        />
      </figure>

      {/* BODY */}
      <div className="card-body">
        <h2 className="card-title justify-center">{user?.name}</h2>

        {user?.bio && <p>{user?.bio}</p>}

        {preview && (
          <>
            <p>
              <span className="font-semibold">📈 :</span>{" "}
              {user?.experienceLevel}
            </p>

            <p>
              <span className="font-semibold">📍:</span> {user?.location}
            </p>

            <div>
              <span className="font-semibold">🛠:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {user?.skills?.map((skill, index) => (
                  <span key={index} className="badge badge-outline">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {/* SWIPE BUTTONS ONLY WHEN NOT PREVIEW */}
        {!preview && (
          <div className="card-actions justify-center mt-4 gap-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSwipes("ignored")}
            >
              Left Swipe
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSwipes("interested")}
            >
              Right Swipe
            </button>
          </div>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};